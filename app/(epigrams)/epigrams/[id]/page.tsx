"use client";

import { use } from "react";
import React from "react";
import styled from "styled-components";

interface EpigramDetail {
  id: number;
  likeCount: number;
  tags: { name: string; id: number }[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  isLiked: boolean;
}

const dummyEpigrams: EpigramDetail[] = [
  {
    id: 1,
    likeCount: 5,
    tags: [{ name: "태그1", id: 101 }],
    writerId: 101,
    referenceUrl: "https://example.com",
    referenceTitle: "참고 제목 1",
    author: "저자 1",
    content: "이것은 더미 에피그램 상세 내용입니다.",
    isLiked: false,
  },
  {
    id: 2,
    likeCount: 10,
    tags: [{ name: "태그2", id: 102 }],
    writerId: 102,
    referenceUrl: "https://example.com/2",
    referenceTitle: "참고 제목 2",
    author: "저자 2",
    content: "두 번째 더미 에피그램 상세 내용입니다.",
    isLiked: true,
  },
];

export default function EpigramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // `use`로 `params` 해제
  const { id } = use(params);

  const epigramDetail = dummyEpigrams.find(
    (epigram) => epigram.id === parseInt(id, 10)
  );

  if (!epigramDetail) {
    return <p>해당 에피그램을 찾을 수 없습니다.</p>;
  }

  return (
    <Container>
      <h1>에피그램 상세</h1>
      <DetailCard>
        <p>
          <strong>내용:</strong> {epigramDetail.content}
        </p>
        <p>
          <strong>저자:</strong> {epigramDetail.author}
        </p>
        <p>
          <strong>참고 제목:</strong>{" "}
          <a
            href={epigramDetail.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {epigramDetail.referenceTitle}
          </a>
        </p>
        <p>
          <strong>태그:</strong>{" "}
          {epigramDetail.tags.map((tag) => tag.name).join(", ")}
        </p>
        <p>
          <strong>좋아요 수:</strong> {epigramDetail.likeCount}
        </p>
      </DetailCard>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 50px auto;
`;

const DetailCard = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`;
