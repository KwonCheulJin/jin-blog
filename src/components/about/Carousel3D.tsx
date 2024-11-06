import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProjectCard from '@/components/about/ProjectCard';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
  {
    title: '같이 달램(코드잇 프론트엔드 단기심화 3기 프로젝트)',
    description:
      '유저가 바쁜 일상 속 휴식을 위한 다양한 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 생성할 수 있는 서비스입니다.',
    imageUrl: '/images/intro-content.svg',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'zustand',
      'axios',
      'Jest',
      'Playwright',
    ],
    detailsUrl: 'https://relax-together.vercel.app',
  },
  {
    title: '리버스쿨(정보보안 교육 플랫폼)',
    description:
      '리버싱, 버그헌팅, 인공지능 등 정보보안 분야의 모든 기술을 학습할 수 있는 곳. 실무에 바로 활용 가능한 기술들을 누구나 이해할 수 있도록 고민하고 연구합니다',
    imageUrl: '/images/reverschool-image.png',
    tags: [
      'React',
      'TypeScript',
      'styled-components',
      'Redux',
      'Redux-saga',
      'axios',
    ],
    detailsUrl: 'https://reverschool.com',
  },
];

export default function Carousel3D() {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="relative"
    >
      {projects.map(project => (
        <SwiperSlide key={project.title}>
          <ProjectCard {...project} />
        </SwiperSlide>
      ))}
      {projects.map(project => (
        <SwiperSlide key={project.title}>
          <ProjectCard {...project} />
        </SwiperSlide>
      ))}

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow !h-12 !w-12 xs:!top-[28%]">
          <FaArrowAltCircleLeft className="!h-12 !w-12  !text-primary-500 hover:!text-primary-500/90 dark:!text-primaryDark dark:hover:!text-primaryDark/90" />
        </div>
        <div className="swiper-button-next slider-arrow !h-12 !w-12 xs:!top-[28%]">
          <FaArrowAltCircleRight className="!h-12 !w-12  !text-primary-500 hover:!text-primary-500/90 dark:!text-primaryDark dark:hover:!text-primaryDark/90" />
        </div>
      </div>
    </Swiper>
  );
}
