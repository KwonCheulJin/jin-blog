import { WebhookHandler, stringifyCommentBody } from '@liveblocks/node';
import { Resend } from 'resend';

import { liveblocks } from '@/lib/liveblocks';
import { generateAnonymousName } from '@/lib/utils';

// 사용자 ID로 친숙한 이름 가져오기
function getDisplayName(userId: string): string {
  // 이메일 형식이면 @ 앞부분 사용
  if (userId.includes('@')) {
    return userId.split('@')[0];
  }
  // 익명 사용자면 랜덤 이름 생성 (seed 기반으로 일관된 이름)
  if (userId.startsWith('anonymous-')) {
    return generateAnonymousName(userId);
  }
  return userId;
}

export async function POST(request: Request) {
  // 환경 변수 확인
  if (!process.env.LIVEBLOCKS_WEBHOOK_SECRET) {
    console.error('LIVEBLOCKS_WEBHOOK_SECRET is not configured');
    return new Response('Webhook not configured', { status: 500 });
  }

  const webhookHandler = new WebhookHandler(process.env.LIVEBLOCKS_WEBHOOK_SECRET);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await request.text();
  const headers = Object.fromEntries(request.headers.entries());

  // 1. Webhook 검증
  let event;
  try {
    event = webhookHandler.verifyRequest({
      headers,
      rawBody: body,
    });
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return new Response('Webhook verification failed', { status: 401 });
  }

  // 2. CommentCreated 이벤트만 처리
  if (event.type === 'commentCreated') {
    const { roomId, threadId, commentId } = event.data;
    const postSlug = roomId.replace('blog-post-', '');

    try {
      // 3. 댓글 및 스레드 데이터 조회
      const [comment, thread] = await Promise.all([
        liveblocks.getComment({
          roomId,
          threadId,
          commentId,
        }),
        liveblocks.getThread({
          roomId,
          threadId,
        }),
      ]);

      // 4. 사용자 정보 조회
      const isAnonymous = comment.userId.startsWith('anonymous-');
      const authorEmail = thread.metadata?.authorEmail as string | undefined;
      const displayName = authorEmail
        ? authorEmail.split('@')[0]
        : getDisplayName(comment.userId);

      // 5. 댓글 본문 HTML로 변환
      const htmlBody = comment.body
        ? await stringifyCommentBody(comment.body, {
            format: 'html',
          })
        : '';

      // 6. 이메일 발송
      await resend.emails.send({
        from: 'Jin Blog <onboarding@resend.dev>',
        to: process.env.BLOG_OWNER_EMAIL!,
        subject: `[Jin's Blog] ${displayName}님이 댓글을 남겼습니다`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
              .comment-box { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #667eea; margin: 16px 0; }
              .meta { color: #6b7280; font-size: 14px; margin-bottom: 8px; }
              .author { display: inline-flex; align-items: center; gap: 8px; }
              .author-badge { background: ${isAnonymous ? '#f3f4f6' : '#dbeafe'}; color: ${isAnonymous ? '#6b7280' : '#1d4ed8'}; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
              .footer { text-align: center; color: #9ca3af; font-size: 12px; padding: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">💬 새 댓글 알림</h1>
              </div>
              <div class="content">
                <p class="meta">
                  <span class="author">
                    <strong>작성자:</strong> ${displayName}
                    <span class="author-badge">${isAnonymous ? '익명' : '회원'}</span>
                  </span><br>
                  ${authorEmail ? `<strong>이메일:</strong> ${authorEmail}<br>` : ''}
                  <strong>포스트 ID:</strong> ${postSlug}
                </p>
                <div class="comment-box">
                  ${htmlBody}
                </div>
                <a href="https://www.jin-blog.dev/posts/${postSlug}" class="button">
                  포스트 보러가기 →
                </a>
              </div>
              <div class="footer">
                <p>Jin's Blog 댓글 알림 시스템</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log(`Email sent for comment ${commentId} on post ${postSlug} by ${displayName}`);
    } catch (error) {
      console.error('Failed to process comment notification:', error);
      return new Response('Failed to process notification', { status: 500 });
    }
  }

  return new Response('OK', { status: 200 });
}
