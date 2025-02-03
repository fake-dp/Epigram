'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface EpigramCardProps {
  id: number;
  likeCount: number;
  tags: { name: string; id: number }[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

export default function EpigramListCard({
  id,
  // likeCount,
  tags,
  // writerId,
  // referenceUrl,
  // referenceTitle,
  author,
  content,
}: EpigramCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/epigrams/${id}`);
  };

  return (
    <CardContainer>
      <TextContainer onClick={handleClick}>
        <MainText>{content}</MainText>
        <SubText className="mt">- {author}</SubText>
      </TextContainer>
      <SubText>{tags.map((tag) => `#${tag.name}`).join(', ')}</SubText>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  padding: 16px 16px 10px 16px;
  border-radius: 12px;
  background-image: url('/images/card_bg.png');
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const MainText = styled.h3`
  font-family: IropkeBatangM;
  font-size: 20px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #373737;
`;

const SubText = styled.p`
  font-family: IropkeBatangM;
  font-size: 18px;
  font-weight: 400;
  line-height: 40px;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #abb8ce;
  &.mt {
    /* margin-top: 30px; */
  }
`;
