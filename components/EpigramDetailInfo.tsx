'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteEpigram } from '@/lib/apis/epigram';
import { useAuthStore } from '@/store/authStore';
import { useEpigramStore } from '@/store/epigramStore';

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

export default function EpigramDetailInfo({ epigram }: { epigram: EpigramDetail }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { toggleLike } = useEpigramStore();

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteEpigram(epigram.id);
        alert('삭제되었습니다.');
        router.push('/epigramlist');
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  return (
    <DetailCardContainer>
      <DetailCardInner>
        <DetailCard>
          <TagContainer>
            <TagText>{epigram.tags.map((tag) => `#${tag.name}`).join(',  ')}</TagText>
            {epigram.writerId === user?.id && (
              <MenuContainer>
                <Image
                  src="/images/more_vertical.png"
                  alt="메뉴"
                  width={32}
                  height={32}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                />
                {isMenuOpen && (
                  <DropdownMenu>
                    <MenuItem onClick={() => router.push(`/editepigram/${epigram.id}`)}>
                      수정하기
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
                  </DropdownMenu>
                )}
              </MenuContainer>
            )}
          </TagContainer>
          <MainText>{epigram.content}</MainText>
          <AuthorText>- {epigram.author} -</AuthorText>
          <BtnContainer>
            <LikeBtn onClick={toggleLike}>
              <Image
                src="/images/like.png"
                alt="좋아요"
                width={30}
                height={30}
                style={{ marginRight: '12px' }}
              />
              {epigram.likeCount}
            </LikeBtn>

            <LinkBtn
              onClick={() => window.open(epigram.referenceUrl, '_blank', 'noopener,noreferrer')}
            >
              {epigram.referenceTitle}
              <Image
                src="/images/external_link.png"
                alt="링크"
                width={30}
                height={30}
                style={{ marginLeft: '12px' }}
              />
            </LinkBtn>
          </BtnContainer>
        </DetailCard>
      </DetailCardInner>
      <Divider>
        <Image
          src="/images/landing_line.png"
          alt="경계선"
          width={1920}
          height={10}
          style={{ objectFit: 'cover' }}
        />
      </Divider>
    </DetailCardContainer>
  );
}

const DetailCardContainer = styled.div`
  width: 100%;
`;

const DetailCardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/images/landing_bg.png');
  background-size: cover;
  background-position: center;
  width: 100%;
`;

const DetailCard = styled.div`
  padding: 40px 20px 20px 20px;
  margin-top: 40px;
  width: 680px;
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  height: 10px;
  justify-content: center;
  background-color: #f5f5f5;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 30px;
`;

const MainText = styled.h3`
  font-family: IropkeBatangM;
  font-size: 24px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #373737;
`;

const TagText = styled.p`
  font-family: IropkeBatangM;
  font-size: 20px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #abb8ce;
`;

const AuthorText = styled.p`
  font-family: IropkeBatangM;
  font-size: 22px;
  font-weight: 400;
  line-height: 40px;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #abb8ce;
  margin-top: 50px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: #373737;
  border-radius: 100px;
  padding: 6px 24px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #fff;
  cursor: pointer;
  /* &:hover {
    background-color: #373737;
  } */
`;

const LinkBtn = styled.button`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  border: 1px solid #ababab;
  border-radius: 100px;
  padding: 6px 24px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #ababab;
  cursor: pointer;
  /* &:hover {
    background-color: #373737;
  } */
`;

const MenuContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 120px;
`;

const MenuItem = styled.button`
  padding: 10px 15px;
  text-align: left;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
