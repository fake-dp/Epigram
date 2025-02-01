'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { login } from '@/lib/apis/auth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data);

      const { accessToken, refreshToken, user } = response;
      setAuth(accessToken, refreshToken, user);

      router.push('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
