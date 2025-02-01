'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { signUp } from '@/lib/apis/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);

  const handleSignup = async (data: {
    email: string;
    password: string;
    passwordConfirmation?: string;
    nickname?: string;
  }) => {
    if (!data.passwordConfirmation || !data.nickname) {
      alert('비밀번호 확인 및 닉네임을 입력해주세요.');
      return;
    }

    const signUpData = {
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      nickname: data.nickname,
    };

    try {
      const response = await signUp(signUpData);
      console.log('회원가입 성공:', response);

      const { accessToken, refreshToken, user } = response;
      setAuth(accessToken, refreshToken, user);

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      alert('회원가입에 성공했습니다!');
      router.push('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
}
