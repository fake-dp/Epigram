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

      const { accessToken, refreshToken, user } = response;
      setAuth(accessToken, refreshToken, user);

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      alert('회원가입에 성공했습니다!');
      router.push('/');
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: any } };

        if (axiosError.response?.data?.message === 'Internal Server Error') {
          alert('이미 중복된 닉네임입니다.');
        } else {
          alert(
            axiosError.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.',
          );
        }
      } else {
        console.error('알 수 없는 회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
}
