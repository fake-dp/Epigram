'use client';

import React, { useEffect, useState, use } from 'react';
import styled from 'styled-components';
import { updateEpigram, getEpigramDetail } from '@/lib/apis/epigram';
import { useRouter } from 'next/navigation';

export default function EditEpigramPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const epigramId = parseInt(id, 10);

  const [formData, setFormData] = useState({
    tags: '',
    referenceUrl: '',
    referenceTitle: '',
    author: '',
    content: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEpigram = async () => {
      try {
        const response = await getEpigramDetail(epigramId);
        const tagsString = response.tags.map((tag: any) => tag.name).join(', ');
        setFormData({
          tags: tagsString,
          referenceUrl: response.referenceUrl,
          referenceTitle: response.referenceTitle,
          author: response.author,
          content: response.content,
        });
      } catch (error) {
        console.error('에피그램 데이터를 불러오지 못했습니다:', error);
      }
    };

    fetchEpigram();
  }, [epigramId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = formData.tags.split(',').map((tag) => tag.trim());

    try {
      const response = await updateEpigram(epigramId, {
        tags: tagsArray,
        referenceUrl: formData.referenceUrl,
        referenceTitle: formData.referenceTitle,
        author: formData.author,
        content: formData.content,
      });
      console.log('수정 성공:', response);
      setMessage('에피그램이 성공적으로 수정되었습니다!');
      router.push('/epigramlist');
    } catch (error) {
      console.error('수정 실패:', error);
      setMessage('에피그램 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <InnerFormBox>
        <Form onSubmit={handleSubmit}>
          <TitleText>에피그램 수정하기</TitleText>
          <Label>
            내용<span>*</span>
          </Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="200자 이내로 입력해주세요."
          ></TextArea>

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
            <RadioOption>
              <input
                type="radio"
                id="self"
                name="authorOption"
                value="본인"
                checked={formData.author === '본인'}
                onChange={() => setFormData({ ...formData, author: '본인' })}
              />
              <label htmlFor="self">본인</label>
            </RadioOption>
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

          <SubmitButton type="submit">수정 완료</SubmitButton>
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
