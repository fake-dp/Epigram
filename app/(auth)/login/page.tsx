"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { login } from "@/lib/apis/auth";

export default function LoginPage() {
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      // 로그인 API 호출
      const response = await login(data);

      // 응답 데이터 확인
      console.log("로그인 성공:", response);

      // 토큰 저장 (로컬 스토리지)
      localStorage.setItem("access_token", response.accessToken);
      localStorage.setItem("refresh_token", response.refreshToken);

      // 로그인 후 메인 페이지로 이동
      window.location.href = "/";
    } catch (error) {
      console.error("로그인 실패:", error);
      // 나중에 본인이 에러코드 작성해서 하시면 됩니다.
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}
