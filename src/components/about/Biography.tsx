import Image from 'next/image';

export default function Biography() {
  return (
    <div className="w-full grid grid-cols-8 gap-16 sm:gap-8">
      <div className="col-span-5 flex flex-col items-start justify-start md:order-2 md:col-span-8">
        <h2 className="mb-4 text-xl font-bold uppercase text-dark/75 dark:text-light/75">
          Biography
        </h2>
        <p className="font-medium text-lg">
          저는 10년 동안 세심함과 최적화가 일상인 프론트엔드 개발자입니다.
          <br />
          <br />
          개발자가 되기 전 7년간 여성복 패턴 제작 경험을 바탕으로 익힌 세심함은 개발 분야에서도
          필수적인 요소였습니다. 이런 세심함을 바탕으로 프로젝트의 세부 사항에 주의를 기울여
          안정적이며 최적화된 사용자 경험을 제공하는 서비스 구현에 집중하고 있습니다.
          <br />
          <br />
          최근에는 서비스의 안정성 향상을 위해 단위테스트, E2E테스트 학습 및 도입을 통해 품질
          관리에도 많은 노력을 기울이고 있습니다.
          <br />
          <br />
          개발 경력은 스파르타 코딩클럽에서 웹개발 기본교육 수료 후, 구공팩토리 부트캠프를 통해서
          본격적으로 시작하게 되었습니다.
          <br />
          <br />
          이후 프리픽스(SI)에 입사하여 교보문고 VCMS(Video Content Management System) 프로젝트에서
          Java, JSP, Mybatis 등의 기술을 사용하여 백오피스 화면 CRUD 기능에 대한 작업을
          진행하였습니다.
          <br />
          <br />
          현재는 옵스테크에서 리버스쿨(보안 교육 플랫폼)의 프론트엔드를 담당하며 React, Typescript,
          Redux, Redux-saga, styled-components 등의 기술 스택을 사용합니다. <br />
          <br />
          랜딩 페이지 FCP 속도를 2.3초에서 1.0초로 개선하였으며, Lighthouse 성능 점수를 59점에서
          89점으로 향상했습니다. <br />
          <br />
          또한 QA 과정에서, 다중 탭을 사용할 때 사용자 간의 정보가 공유되지 않는 문제를 발견하였고
          BroadcastChannel과 visibilitychange 이벤트를 활용하여 다중탭에서 사용자 정보를 동기화하는
          기능을 구현하여 이슈를 해결 해 본 경험이 있습니다. <br />
        </p>
        <br />
        <p className="mb-4 font-medium text-lg">
          테스트 코드 작성의 중요성 인식 하여 현재 메가테라에서 진행하는{' '}
          {'프론트엔드 생존 코스 3기'} 에 참여하여 단위 테스트 및 E2E 테스트에 대한 지식을
          배웠습니다. <br />
          <br />
          이를 통해 테스트에 대한 부담감을 줄이고, 현재 진행 중인 KISA(한국인터넷진흥원) 지능형 CCTV
          성능 검사 시스템에서 E2E테스트 도입해서 진행 중에 있습니다.
        </p>
        <p className="font-medium text-lg">
          사용자 중심의 개발을 지향하며, 지속적인 학습과 회고를 통해 꾸준히 성장하는 것에 열중하고
          있습니다. 이 지향점을 바탕으로 보다 안정적이고 최적화된 사용자 경험을 제공하는 웹 서비스를
          개발하는 개발자로 계속 성장하려 합니다. <br />
          <br />
          다가오는 도전에 대한 열린 마음과 배움에 대한 열정을 가지고 계속해서 발전하는 프론트엔드
          개발자가 될 것입니다.
        </p>
      </div>
      <div className="col-span-3 relative h-3/4 rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light md:order-1 md:col-span-8">
        <Image
          src="/images/about.webp"
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
