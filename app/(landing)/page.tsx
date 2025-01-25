"use client";

import styled from "styled-components";

// 스타일 컴포넌트 정의
const Main = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const Text = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #4b5563; // gray-600
`;

const ButtonLink = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  color: white;
  background-color: #3b82f6; // blue-500
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb; // blue-600
  }
`;

// 컴포넌트 정의
export default function LandingPage() {
  return (
    <Main>
      <Text>렌딩 페이지</Text>
      <ButtonLink href="/login">로그인 페이지</ButtonLink>
      <ButtonLink href="/signup">회원가입 페이지</ButtonLink>
    </Main>
  );
}
