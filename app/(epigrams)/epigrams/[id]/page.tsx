'use client';

import React, { useEffect, useState, use } from 'react';
import styled from 'styled-components';
import { useEpigramStore } from '@/store/epigramStore';

import { getEpigramDetail } from '@/lib/apis/epigram';
import EpigramDetailInfo from '@/components/EpigramDetailInfo';
import EpigramComment from '@/components/EpigramComment';

export default function EpigramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { epigramDetail, setEpigramDetail } = useEpigramStore();
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEpigramDetail(parseInt(id, 10));
        setEpigramDetail(response);
      } catch (error) {
        console.error('에피그램 상세 정보를 불러오지 못했습니다:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id, setEpigramDetail]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!epigramDetail) {
    return (
      <Container>
        <NoListText>해당 에피그램을 찾을 수 없습니다.</NoListText>;
      </Container>
    );
  }

  return (
    <Container>
      <EpigramDetailInfo epigram={epigramDetail} />
      <EpigramComment epigramId={parseInt(id, 10)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NoListText = styled.h3`
  text-align: center;
  font-size: 24px;
  color: red;
`;
