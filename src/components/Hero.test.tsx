import { describe, it, expect } from 'vitest'
import Hero from '@/components/Hero'
import { render, screen } from '@testing-library/react'

const context = describe

describe('Hero', () => {
  function renderHero() {
    render(<Hero />);
  }
  context('컴포넌트가 렌더링 되면', () => {
    it('이미지를 확인할 수 있다.', () => {
      renderHero();
      expect(screen.getByAltText(/my-profile/)).toBeInTheDocument();
    });
    it('애니메이션 텍스트를 확인할 수 있다.', () => {
      renderHero();
      expect(screen.getByText(/growing/)).toBeInTheDocument();
      expect(screen.getByText(/into/)).toBeInTheDocument();
      expect(screen.getByText('a')).toBeInTheDocument();
      expect(screen.getByText(/developer/)).toBeInTheDocument();
      expect(screen.getByText(/who/)).toBeInTheDocument();
      expect(screen.getByText(/can/)).toBeInTheDocument();
      expect(screen.getByText(/help/)).toBeInTheDocument();
      expect(screen.getByText(/someone./)).toBeInTheDocument();
    });
  });
});
