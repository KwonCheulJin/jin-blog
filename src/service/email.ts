import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer';

export type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  prot: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER, // 보내는 메일의 주소
    pass: process.env.AUTH_PASS, // 보내는 메일의 비밀번호
  },
} as SMTPTransport.TransportOptions);

export async function sendEmail({ subject, from, message }: EmailData) {
  const mailData = {
    to: process.env.AUTH_USER,
    subject: `[BLOG] ${subject}`,
    from,
    html: `
    <h1>${subject}</h1>
    <div>${message}</div>
    <br/>
    <p>보낸사람: ${from}</p>
    `,
  };

  return transporter.sendMail(mailData);
}
