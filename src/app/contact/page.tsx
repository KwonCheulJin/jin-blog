import ContactForm from '@/components/ContactForm';
import { AiFillGithub } from 'react-icons/ai';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-2">Contact Me</h2>
      <p>chkftm12@gmail.com</p>
      <div>
        <a
          href="https://github.com/KwonCheulJin"
          target="_blank"
          rel="noreferrer"
          className="text-5xl hover:text-yellow-500"
        >
          <AiFillGithub />
        </a>
      </div>
      <h2 className="text-3xl font-bold my-8">Or Send me an email</h2>
      <ContactForm />
    </section>
  );
}
