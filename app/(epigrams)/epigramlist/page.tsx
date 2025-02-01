'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EpigramListCard from '@/components/EpigramListCard';
import { useEpigramStore } from '@/store/epigramStore';
import { useRouter } from 'next/navigation';
import { getEpigramList } from '@/lib/apis/epigram';

export default function EpigramListPage() {
  const router = useRouter();
  const { epigrams, setEpigrams, addEpigrams } = useEpigramStore();
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getEpigramList(6);
        setEpigrams(response.list);
        setCursor(response.nextCursor ?? null);
        // setHasMore(response.list.length > 0);
      } catch (error) {
        console.error('에피그램 리스트 가져오기 실패:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [setEpigrams]);

  const loadMore = async () => {
    if (!cursor || loading) return;

    setLoading(true);
    try {
      const response = await getEpigramList(6, cursor);
      addEpigrams(response.list);
      setCursor(response.nextCursor ?? null);
      // setHasMore(response.list.length > 0);
    } catch (error) {
      console.error('추가 데이터 불러오기 실패:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <TitleBox>
        <Title>피드</Title>
      </TitleBox>
      <GridContainer>
        {epigrams.map((epigram) => (
          <EpigramListCard
            id={epigram.id}
            key={epigram.id}
            likeCount={epigram.likeCount}
            tags={epigram.tags}
            writerId={epigram.writerId}
            referenceUrl={epigram.referenceUrl}
            referenceTitle={epigram.referenceTitle}
            author={epigram.author}
            content={epigram.content}
          />
        ))}
      </GridContainer>

      <LoadMoreButton onClick={loadMore} disabled={loading}>
        + 에피그램 더보기
      </LoadMoreButton>

      <FloatingButton onClick={() => router.push('/addepigram')}>+ 에피그램 만들기</FloatingButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  color: #8b9dbc;
  transition: background-color 0.3s;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 50px;
  width: 180px;
  height: 60px;
  background-color: #2d394e;
  color: white;
  border: none;
  border-radius: 30px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
