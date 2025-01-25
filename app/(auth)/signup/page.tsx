"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const handleSignup = (data: { email: string; password: string; nickname?: string }) => {
    console.log("회원가입 데이터:", data);
    // 회원가입 API 호출 로직 추가
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
}
