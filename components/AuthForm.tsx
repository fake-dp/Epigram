"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const InnerFormBox =styled.div`
  width: 620px;
`
const Form = styled.form`
  width: 100%;
`;

const Header = styled.div`
display: flex;
justify-content: center;
margin-bottom: 34px;
`;


const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ECEFF4;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
  background: #f7f9fc;
  &:focus {
    border-color: #CBD3E1;
    outline: none;
  }
`;

const Label = styled.p`
font-family: Pretendard;
font-size: 18px;
font-weight: 500;
line-height: 22px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#2D394E;
margin: 20px 0 12px 10px;
width: 100%;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #CBD3E1;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2D394E;
  }
  `;

const NaviContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const NaviText = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #ABB8CE;
  margin-bottom: 4px;

  &:last-child {
    color: #454545;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 8px;
    &:hover {
      color: #0056b3;
    }
  }
`;

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (data: {
    email: string;
    password: string;
    passwordConfirmation: string;
    nickname: string;
  }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const router = useRouter();

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
      (type === "signup" &&
        (!nickname || !confirmPassword || password !== confirmPassword))
    ) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    setError("");
    onSubmit({
      email,
      password,
      ...(type === "signup" && {
        passwordConfirmation: confirmPassword,
        nickname,
      }),
    } as {
      email: string;
      password: string;
      passwordConfirmation: string;
      nickname: string;
    });
  };

  return (
    <Container>
        <InnerFormBox>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Image
          src="/images/login_log.png"
          alt="로그인 로고"
          width={172}
          height={48}
          priority
        />
        </Header>
        {
            type === "signup"? <Label>이메일</Label>:null
        }
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {
            type === "signup"? <Label>비밀번호</Label>:null
        }
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {type === "signup" && (
          <>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Label>닉네임</Label>
            <Input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit">
          {type === "login" ? "로그인" : "가입하기"}
        </SubmitButton>
        {
            type === "login"? 
            <NaviContainer>
            <NaviText>회원이 아니신가요?</NaviText>
            <NaviText onClick={() => router.push("/signup")}>가입하기</NaviText>
            </NaviContainer>
            :null
        }
      </Form>
      </InnerFormBox>
    </Container>
  );
}
