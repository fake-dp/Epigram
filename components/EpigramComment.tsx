'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CommentInput from '@/components/CommentInput';
import { deleteEpigramComment, updateEpigramComment } from '@/lib/apis/comment';
import { useCommentStore } from '@/store/commentStore';
import { useAuthStore } from '@/store/authStore';
interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

interface Comment {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  epigramId: number;
}

export default function EpigramComment({
  comments,
  epigramId,
}: {
  comments: Comment[];
  epigramId: number;
}) {
  const { deleteComment, editCommentId, setEditCommentId, updateComment } = useCommentStore();
  const { user } = useAuthStore();
  const [editedContent, setEditedContent] = useState('');

  const handleEditClick = (comment: Comment) => {
    setEditCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleUpdate = async (commentId: number) => {
    try {
      await updateEpigramComment(commentId, editedContent, true);
      updateComment(commentId, editedContent);
      setEditCommentId(null);
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteEpigramComment(commentId);
        deleteComment(commentId);
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
      }
    }
  };

  return (
    <Container>
      <CommentCountBox>
        <CountText>댓글 ({comments.length})</CountText>
      </CommentCountBox>
      <CommentInput epigramId={epigramId} />
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            {editCommentId === comment.id ? (
              <EditContainer>
                <EditInput
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <ButtonContainer>
                  <Button className="save" onClick={() => handleUpdate(comment.id)}>
                    저장
                  </Button>
                  <Button onClick={() => setEditCommentId(null)}>취소</Button>
                </ButtonContainer>
              </EditContainer>
            ) : (
              <CommentContent>
                <ProfileImgContainer>
                  {comment.writer.image ? (
                    <Image src={comment.writer.image} alt="유저" width={24} height={24} />
                  ) : (
                    <Image src="/images/user.png" alt="유저" width={24} height={24} />
                  )}
                </ProfileImgContainer>

                <CommentHeader>
                  <CommentInner>
                    <TextContainer>
                      <UserText>{comment.writer.nickname}</UserText>
                      <UserText className="sm">
                        {new Date(comment.createdAt).toLocaleString()}
                      </UserText>
                    </TextContainer>
                    {comment.writer.id === user?.id && (
                      <BtnContainer>
                        <Button onClick={() => handleEditClick(comment)}>수정</Button>
                        <Button className="del" onClick={() => handleDelete(comment.id)}>
                          삭제
                        </Button>
                      </BtnContainer>
                    )}
                  </CommentInner>
                  <p>{comment.content}</p>
                </CommentHeader>
              </CommentContent>
            )}
          </CommentItem>
        ))}
      </CommentList>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommentCountBox = styled.div`
  width: 100%;
  width: 640px;
  margin-bottom: 20px;
`;

const CountText = styled.h3`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #373737;
`;

const CommentList = styled.div`
  margin-top: 10px;
  width: 640px;
`;

const CommentItem = styled.div`
  padding: 20px;
  border-top: 1px solid #ddd;
`;

const CommentContent = styled.div`
  display: flex;
`;

const ProfileImgContainer = styled.div``;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
`;

const CommentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserText = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #5e5e5e;
  margin-right: 10px;
  &.sm {
    font-size: 12px;
    margin-top: 2px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #373737;
  cursor: pointer;
  font-size: 14px;
  padding: 0px 8px 4px 8px;
  margin-left: 2px;
  text-decoration: underline;
  &.del {
    color: #ff6577;
  }
  &.save {
    color: #0070f3;
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditInput = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;
