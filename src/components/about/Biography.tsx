import Image from 'next/image';

export default function Biography() {
  return (
    <div className="w-full grid grid-cols-8 gap-16 sm:gap-8">
      <div className="col-span-4 flex flex-col items-start justify-start md:order-2 md:col-span-8">
        <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
          Biography
        </h2>
        <p className="font-medium">
          긍정적인 마음가짐과 진정성을 가지고 개발을 하고 클라이밍을 좋아하는 프론트엔드 개발자
          JIN이라고 합니다.
          <br /> 개발은 구공팩토리 부트캠프를 통해서 처음 시작하게 되었습니다.
          <br /> 첫 회사 프리픽스에서는 교보문고 VCMS(Video Content Management System)을 개발하는
          프로젝트에 투입되었고 사용한 기술은 백엔드(Java)를 사용하였습니다.
          <br /> 이곳에서는 기본적인 관리자 화면 CRUD 기능에 대한 작업을 진행했었습니다.
        </p>
        <p className="my-4 font-medium">
          프리픽스 이후 옵스테크로 회사를 이직 후에 이곳에서는 리버스쿨(보안 교육 플랫폼)
          프론트엔드를 담당하고 있습니다.
          <br /> 현재 사용하고 있는 기술 스팩은 React, Typescript, Redux, Redux-saga,
          styled-components를 사용하여 개발을 하고있습니다.
          <br /> 혼자서 프론트를 담당하고 있으면서 테스트코드의 중요성을 인식하고 현재 프로젝트에
          적용하지 못해서 메가테라 프론트엔드 생존코스를 통해서 단위 테스트 및 E2E 테스트를
          적용해보기 위해 공부중에 있습니다.
        </p>
        <p className="font-medium">
          저의 목표는 언제나 긍정적인 마인드와 지속적으로 React 및 프론트 관련 기술에 대한 전문
          지식을 연마하는 데 중점을 두고 개발자로서 기술과 지식을 계속해서 성장시켜서 누군가를
          도와줄 수 있는 개발자가 되는 것입니다.
        </p>
      </div>
      <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light md:order-1 md:col-span-8">
        <Image
          src="/images/about.png"
          alt="JIN"
          className="w-full h-auto rounded-2xl bg-dark py-6 dark:bg-light"
          width={250}
          height={450}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
        <div className="absolute top-0 -right-4 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light"></div>
      </div>
    </div>
  );
}
