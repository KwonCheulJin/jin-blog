'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { revalidatePostsAll } from '@/lib/action';
import { postApi } from '@/service/api/postApi';
import { usePostStore } from '@/store/post';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PublishButton() {
  const { addPost, setAddPostInit } = usePostStore();
  const router = useRouter();
  const handelMarkdown = async () => {
    try {
      await postApi.publishPost(addPost);
      setAddPostInit();
      revalidatePostsAll();
      router.push('/posts');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          toast({
            variant: 'destructive',
            description: `${e.response.data.message}`,
          });
        }
      }
    }
  };
  return (
    <Button
      className="text-xl hover:bg-primaryDark hover:text-dark"
      onClick={handelMarkdown}
    >
      출간하기
    </Button>
  );
}
