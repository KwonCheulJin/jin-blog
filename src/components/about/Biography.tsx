import Image from 'next/image';

export default function Biography() {
  return (
    <div className="w-full grid grid-cols-8 gap-16 sm:gap-8">
      <div className="col-span-5 flex flex-col items-start justify-start md:order-2 md:col-span-8">
        <h2 className="mb-4 text-xl font-bold uppercase text-dark/75 dark:text-light/75">
          Biography
        </h2>
        <p className="font-medium text-lg">
          긍정적인 마음가짐과 진정성을 가지고 개발을 하고 클라이밍을 좋아하는 프론트엔드 개발자
          JIN이라고 합니다.
          <br /> 개발은 스파르타 코딩클럽에서 웹개발 기본교육 수료 후 구공팩토리 부트캠프를 통해서
          본격적으로 시작하게 되었습니다.
          <br /> 90일간의 교육을 마치고 프리픽스(SI)에 입사하였습니다.
          <br /> 프리픽스에서는 교보문고 VCMS(Video Content Management System)을 개발하는 프로젝트에
          투입되었고 <br />
          사용한 기술은 Java, JSP, Mybatis를 사용하였습니다.
          <br /> 이곳에서는 기본적인 관리자 화면 CRUD 기능에 대한 작업을 진행했었습니다.
        </p>
        <p className="my-4 prose prose-slate dark:prose-invert font-medium text-lg max-w-full">
          프리픽스 이후 옵스테크로 이직 후에 이곳에서는 리버스쿨(보안 교육 플랫폼) 프론트엔드를
          담당하고 있습니다.
          <br /> 현재 사용하고 있는 기술 스팩은 <code>React</code>, <code>Typescript</code>,{' '}
          <code>Redux</code>, <code>Redux-saga</code>,<code>styled-components</code>를 사용하여
          개발을 하고있습니다.
          <br /> 웹 성능 최적화에 관심이 많아 <code>react-lazy-with-preload</code> 라이브러리를
          사용하여 사용자가 사용하고자 하는 페이지 nav 위에 마우스를 올렸을 때 해당 페이지{' '}
          <code>preload</code> 작업 및 <code>webpack bundle size</code> 작업을 통해서 랜딩페이지
          FCP속도를 2.3초 &rarr; 1.0초로 줄여 본 경험이 있습니다.
          <br /> 프로젝트 중 가장 기억에 남는 것은 사용자가 한 계정으로 다중탭을 띄워놓고 사용하였을
          경우 장바구니 페이지 및 로그인, 로그아웃 관련해서 문제가 있었던 부분을
          <code>BroadcastChannel</code>을 통해서 해결해 본 부분이 가장 기억에 남습니다.
        </p>
        <p className="mb-4 font-medium text-lg">
          테스트코드의 중요성을 인식하고 있지만 혼자서 프론트를 담당하고 있어 현실적인 이유로
          테스트코드를 추가하지 못하였는데 단위 테스트 및 E2E 테스트를 적용해보기 위해 메가테라에서
          진행하는 프론트엔드 생존코스를 통해서 테스트 및 프론트엔드 개발에 대한 전반적인 내용을
          3개월간 훈련을 통해서 테스트에 대한 부담감을 줄이고 새롭게 진행하는 프로젝트에서 테스트
          코드를 적용해서 진행 중에 있습니다.
        </p>
        <p className="font-medium text-lg">
          저의 목표는 언제나 긍정적인 마인드와 지속적으로 React 및 프론트 관련 기술에 대한 전문
          지식을 연마하는 데 중점을 두고 개발자로서 기술과 지식을 계속해서 성장시켜서 누군가를
          도와줄 수 있는 개발자가 되는 것입니다.
        </p>
      </div>
      <div className="col-span-3 relative h-3/4 rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light md:order-1 md:col-span-8">
        <Image
          src="/images/about.png"
          alt="JIN"
          className="w-full h-full rounded-2xl bg-dark py-6 dark:bg-light"
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
