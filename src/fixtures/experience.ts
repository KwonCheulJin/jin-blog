import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    position: 'Front-End Engineer',
    company: 'opstech',
    companyLink: 'https://www.reverschool.com',
    time: '2022.03-2024.08',
    address: 'Remote work',
    projects: [
      {
        title: '리버스쿨(정보 보안 플랫폼) | 22.03-24.08 ',
        description: [
          '서비스의 초기 개발 단계부터 참여하여 웹사이트, 백오피스 화면 개발 및 반응형 작업, 로깅(sentry) 등 서비스 전반에 기여하였습니다.',
          'QA에서, 다중 탭을 사용할 때 사용자 간의 정보가 공유되지 않는 문제를 발견하였고 BroadcastChannel과 visibilitychange 이벤트를 활용하여 다중탭에서 사용자 정보를 동기화하는 기능을 구현하여 이슈를 해결 해 본 경험이 있습니다.',
          'lazy-loading 및 preload를 도입하여 랜딩페이지의 FCP 속도를 2.3초에서 1.0초로 개선, Lighthouse 점수를 59점에서 89점으로 30% 개선한 경험이 있습니다.',
          '프로젝트 배포 시간을 단축하기 위해 swc를 도입하여 133초 걸렸던 배포시간을 90초로 약 33%의 빌드 속도를 단축한 경험이 있습니다.',
        ],
      },
      {
        title:
          '지능형 CCTV 성능 평가 시스템 구축 및 고도화 | 23.06-12, 24.04-07',
        description: [
          'KISA 지능형 CCTV 성능 평가 시스템을 기존에 CS(Client & Server) 프로그램에서 웹으로 변경하는 프로젝트',
          '사용자, 백오피스 화면 구현',
          '서비스 안정성 강화를 위해 주도적으로 E2E테스트를 도입했습니다.',
          '배포 시간을 단축하기 위해 Docker Image 사이즈를 2GB에서 1.2GB로 40%로 감소시킨 경험이 있습니다.',
        ],
      },
    ],
  },
  {
    position: 'Software Engineer',
    company: 'prefix',
    companyLink: '',
    time: '2021.08-2022.03',
    address: '교보문고 파견',
    projects: [
      {
        title: '교보문고 동영상 관리 시스템(Saas)',
        description: ['백오피스 화면 개발'],
      },
    ],
  },
];
