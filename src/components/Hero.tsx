import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center">
      <Image
        className="rounded-full mx-auto"
        src="/images/my-profile.png"
        alt="my-profile"
        width={250}
        height={250}
      />
      <h2 className="text-3xl font-bold mt-2">{"Hi, I'm Jin"}</h2>
      <h3 className="text-lx font-semibold">Front-end Engineer</h3>
      <p>누군가에게 도움이 될 수 있는 개발자로 성장 중입니다.</p>
      <Link href="/contact">
        <button className="bg-yellow-500 rounded-xl font-bold mt-2 px-3 py-1">Contact Me</button>
      </Link>
    </section>
  );
}
