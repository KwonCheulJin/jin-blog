import Image from 'next/image';

export default function Biography() {
  return (
    <div className="w-full grid grid-cols-8 gap-16">
      <div className="col-span-4 flex flex-col items-start justify-start">
        <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
          Biography
        </h2>
        <p className="font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ipsa adipisci laboriosam
          velit sunt vel consequuntur, ad obcaecati voluptas facere eos animi. Assumenda sed ex
          animi eligendi amet id debitis!
        </p>
        <p className="my-4 font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cum laboriosam quas
          molestiae voluptas itaque autem vitae, commodi iure ratione, distinctio esse veniam
          facilis dolorum, molestias sint quis porro debitis!
        </p>
        <p className="font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cum laboriosam quas
          molestiae voluptas itaque autem vitae, commodi iure ratione, distinctio esse veniam
          facilis dolorum, molestias sint quis porro debitis!
        </p>
      </div>
      <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light">
        <Image
          src="/images/about.png"
          alt="JIN"
          className="w-full h-auto rounded-2xl bg-dark py-6 dark:bg-light"
          width={250}
          height={450}
        />
        <div className="absolute top-0 -right-4 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light"></div>
      </div>
    </div>
  );
}
