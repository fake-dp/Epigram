'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { createEpigram } from '@/lib/apis/epigram';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AddEpigramPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    tags: '',
    referenceUrl: '',
    referenceTitle: '',
    author: '',
    content: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState({ content: '', tags: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'content' && value.length > 150) {
      setError((prev) => ({ ...prev, content: '내용은 최대 150자까지 입력 가능합니다.' }));
      return;
    } else {
      setError((prev) => ({ ...prev, content: '' }));
    }

    if (name === 'tags') {
      const tagsArray = value.split(',').map((tag) => tag.trim());
      if (tagsArray.length > 3) {
        setError((prev) => ({ ...prev, tags: '태그는 최대 3개까지 입력 가능합니다.' }));
        return;
      }
      if (tagsArray.some((tag) => tag.length > 10)) {
        setError((prev) => ({ ...prev, tags: '각 태그는 최대 10자까지 입력 가능합니다.' }));
        return;
      }
      setError((prev) => ({ ...prev, tags: '' }));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = formData.tags.split(',').map((tag) => tag.trim());

    try {
      const response = await createEpigram({
        tags: tagsArray,
        referenceUrl: formData.referenceUrl,
        referenceTitle: formData.referenceTitle,
        author: formData.author,
        content: formData.content,
      });

      setMessage('에피그램이 성공적으로 추가되었습니다!');
      router.push(`/epigrams/${response.id}`);
      setFormData({
        tags: '',
        referenceUrl: '',
        referenceTitle: '',
        author: '',
        content: '',
      });
    } catch (error) {
      console.error('에피그램 추가 실패:', error);
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: any } };

        alert(
          axiosError.response?.data?.message || '에피그램 추가에 실패했습니다. 다시 시도해주세요.',
        );
      } else {
        console.error('알 수 없는 로그인 오류:', error);
        alert('에피그램 추가 중 오류가 발생했습니다.');
      }
      setMessage('에피그램 추가에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <InnerFormBox>
        <Form onSubmit={handleSubmit}>
          <TitleText>에피그램 만들기</TitleText>
          <Label>
            내용<span>*</span>
          </Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="150자 이내로 입력해주세요."
            // maxLength={150}
          ></TextArea>
          {error.content && <ErrorMessage>{error.content}</ErrorMessage>}
          <Label>
            저자<span>*</span>
          </Label>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                id="direct"
                name="authorOption"
                value="직접입력"
                checked={formData.author === ''}
                onChange={() => setFormData({ ...formData, author: '' })}
              />
              <label htmlFor="direct">직접입력</label>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                id="unknown"
                name="authorOption"
                value="알 수 없음"
                checked={formData.author === '알 수 없음'}
                onChange={() => setFormData({ ...formData, author: '알 수 없음' })}
              />
              <label htmlFor="unknown">알 수 없음</label>
            </RadioOption>
            {user && (
              <RadioOption>
                <input
                  type="radio"
                  id="self"
                  name="authorOption"
                  value="본인"
                  checked={formData.author === user?.nickname}
                  onChange={() => setFormData({ ...formData, author: user?.nickname })}
                />
                <label htmlFor="self">본인</label>
              </RadioOption>
            )}
          </RadioGroup>

          <Input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="저자 이름 입력"
          />

          <Label>출처</Label>
          <Input
            type="text"
            name="referenceTitle"
            value={formData.referenceTitle}
            onChange={handleChange}
            placeholder="출처 제목 입력"
          />
          <Input
            type="url"
            name="referenceUrl"
            value={formData.referenceUrl}
            onChange={handleChange}
            placeholder="URL (ex. https://www.website.com)"
          />

          <Label>태그</Label>
          <Input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="태그 작성 (예: 태그1, 태그2)"
          />

          <SubmitButton type="submit">작성 완료</SubmitButton>
          {message && <Message>{message}</Message>}
        </Form>
      </InnerFormBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 100px 10px 100px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InnerFormBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TitleText = styled.h2`
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 620px;
`;

const Label = styled.label`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-top: 10px;
  span {
    color: #ff6577;
    margin-left: 6px;
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #cbd3e1;
  border-radius: 12px;
  &:focus {
    border-color: #cbd3e1;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cbd3e1;
  border-radius: 12px;
  resize: none;
  height: 160px;
  &:focus {
    border-color: #cbd3e1;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #cbd3e1;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &:hover {
    background-color: #2d394e;
  }
`;

const Message = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #2d394e;
`;
const ErrorMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 4px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin: 4px 0;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  input[type='radio'] {
    width: 20px;
    height: 20px;
    accent-color: #40516e;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s;
    &:checked {
      filter: brightness(1.2);
    }
  }

  label {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 32px;
    margin-left: 4px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    cursor: pointer;
  }
`;
