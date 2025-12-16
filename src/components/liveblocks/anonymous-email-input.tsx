'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'liveblocks-anonymous-email';

type Props = {
  onEmailChange: (email: string) => void;
  isAnonymous: boolean;
};

export function AnonymousEmailInput({ onEmailChange, isAnonymous }: Props) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  // localStorage에서 저장된 이메일 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem(STORAGE_KEY) || '';
      setEmail(savedEmail);
      onEmailChange(savedEmail);
    }
  }, [onEmailChange]);

  const validateEmail = (value: string): boolean => {
    if (!value) {
      return true; // 빈 값은 유효 (선택적)
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const valid = validateEmail(value);
    setIsValid(valid);

    if (valid) {
      onEmailChange(value);
      // localStorage에 저장
      if (typeof window !== 'undefined') {
        if (value) {
          localStorage.setItem(STORAGE_KEY, value);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  };

  if (!isAnonymous) {
    return null;
  }

  const stopPropagation = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="px-3 pt-3 pb-1 border-b border-gray-100"
      onClick={stopPropagation}
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
    >
      <input
        type="email"
        value={email}
        onChange={handleChange}
        onClick={stopPropagation}
        onPointerDown={stopPropagation}
        onMouseDown={stopPropagation}
        placeholder="이메일 (선택사항)"
        className={`w-full px-2 py-1.5 text-sm border rounded-md outline-none transition-colors text-black
          ${isValid
            ? 'border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100'
            : 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100'
          }
        `}
      />
      {!isValid && (
        <p className="mt-1 text-xs text-red-500">올바른 이메일 형식을 입력해주세요</p>
      )}
      <p className="mt-1 text-xs text-gray-400">
        답글 알림을 원하시면 이메일을 입력해주세요
      </p>
    </div>
  );
}
