'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 100px 10px 100px 10px;
`;

const InnerFormBox = styled.div`
  width: 620px;
`;

const Form = styled.form`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 34px;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ error }) => (error ? '#e74c3c' : '#ECEFF4')};
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 8px;
  background: #f7f9fc;
  &:focus {
    border-color: #cbd3e1;
    outline: none;
  }
`;

const Label = styled.p`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #2d394e;
  margin: 20px 0 12px 10px;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #cbd3e1;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #2d394e;
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
  color: #abb8ce;
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
  type: 'login' | 'signup';
  onSubmit: (data: {
    email: string;
    password: string;
    passwordConfirmation?: string;
    nickname?: string;
  }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const router = useRouter();

  // ✅ 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [globalError, setGlobalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGlobalError('');
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '', nickname: '' };

    if (!formData.email) {
      newErrors.email = '이메일은 필수 입력입니다.';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '이메일 형식으로 작성해 주세요.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '비밀번호는 필수 입력입니다.';
      isValid = false;
    }

    if (type === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호 확인은 필수 입력입니다.';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        isValid = false;
      }

      if (!formData.nickname) {
        newErrors.nickname = '닉네임은 필수 입력입니다.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit({
        email: formData.email,
        password: formData.password,
        ...(type === 'signup' && {
          passwordConfirmation: formData.confirmPassword,
          nickname: formData.nickname,
        }),
      });
    } catch (error: any) {
      if (error.response?.status === 500 && type === 'signup') {
        setErrors((prev) => ({ ...prev, nickname: '이미 사용 중인 닉네임입니다.' }));
      } else {
        setGlobalError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <Container>
      <InnerFormBox>
        <Form onSubmit={handleSubmit}>
          <Header>
            <Image src="/images/login_log.png" alt="로그인 로고" width={172} height={48} priority />
          </Header>

          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

          {type === 'signup' && (
            <>
              <Label>비밀번호 확인</Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}

              <Label>닉네임</Label>
              <Input
                type="text"
                name="nickname"
                placeholder="닉네임"
                value={formData.nickname}
                onChange={handleChange}
              />
              {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
            </>
          )}

          {globalError && <ErrorMessage>{globalError}</ErrorMessage>}

          <SubmitButton type="submit">{type === 'login' ? '로그인' : '가입하기'}</SubmitButton>
          {type === 'login' ? (
            <NaviContainer>
              <NaviText>회원이 아니신가요?</NaviText>
              <NaviText onClick={() => router.push('/signup')}>가입하기</NaviText>
            </NaviContainer>
          ) : null}
        </Form>
      </InnerFormBox>
    </Container>
  );
}
