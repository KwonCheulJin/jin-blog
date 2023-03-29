'use client';
import { TextareaHTMLAttributes, useState } from 'react';
import Banner, { BannerData } from './Banner';

type Form = {
  from: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<Form>({
    from: '',
    subject: '',
    message: '',
  });
  const [banner, setBanner] = useState<BannerData | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSummit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    setBanner({ message: '성공했어!', state: 'error' });
    // setTimeout(() => {
    //   setBanner(null);
    // }, 3000);
  };

  return (
    <section className="w-full max-w-md">
      {banner && <Banner banner={banner} />}
      <form
        onSubmit={onSummit}
        className="w-full flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl text-white"
      >
        <label htmlFor="from" className="font-semibold">
          Your Email
        </label>
        <input
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
          className="text-black rounded-sm font-semibold"
        />
        <label htmlFor="subject" className="font-semibold">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
          className="text-black rounded-sm font-semibold"
        />
        <label htmlFor="message" className="font-semibold">
          Message
        </label>
        <textarea
          rows={10}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          className="resize-none text-black rounded-sm font-semibold"
        />
        <button className="bg-yellow-300 text-black font-bold rounded-sm hover:bg-yellow-500">
          Summit
        </button>
      </form>
    </section>
  );
}
