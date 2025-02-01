// components/CommentInput.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useCommentStore } from '@/store/commentStore';
import { createEpigramComment } from '@/lib/apis/comment';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

interface CommentInputProps {
  epigramId: number;
}

export default function CommentInput({ epigramId }: CommentInputProps) {
  const { user } = useAuthStore();
  const [comment, setComment] = useState('');
  //   const [isPrivate, setIsPrivate] = useState(false);
  const isPrivate = false;
  const { fetchComments } = useCommentStore();

  console.log('user123', user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await createEpigramComment({ epigramId, content: comment, isPrivate });
      setComment('');
      fetchComments(epigramId, 10);
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeaderContainer>
        {user?.image ? (
          <ProfileImgContainer>
            <Image src={user?.image} alt="유저" width={30} height={30} />
          </ProfileImgContainer>
        ) : (
          <ProfileImgContainer>
            <Image src="/images/user.png" alt="유저" width={30} height={30} />
          </ProfileImgContainer>
        )}
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
      </FormHeaderContainer>
      <BtnContainer>
        <SubmitButton type="submit">등록</SubmitButton>
      </BtnContainer>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 640px;
  margin-bottom: 20px;
`;

const FormHeaderContainer = styled.div`
  display: flex;
`;
const ProfileImgContainer = styled.div`
  margin-right: 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  resize: none;
  &:focus {
    border-color: #cbd3e1;
    outline: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  width: 120px;
  background-color: #2d394e;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #242e3f;
  }
`;
