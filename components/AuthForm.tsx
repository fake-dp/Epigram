"use client";

import React, { useState } from "react";


interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (data: { email: string; password: string; nickname?: string }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      (type === "signup" && (!nickname || password !== confirmPassword))
    ) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    setError("");
    onSubmit({ email, password, ...(type === "signup" && { nickname }) });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Epigram</h1>
          <p>{type === "login" ? "로그인" : "회원가입"}</p>
        </div>

        <label>이메일</label>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {type === "signup" && (
          <>
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </>
        )}

        {error && <p>{error}</p>}

        <button type="submit">
          {type === "login" ? "로그인" : "가입하기"}
        </button>
      </form>
    </div>
  );
}

