"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";

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

export default function EpigramDetailInfo({
  epigram,
}: {
  epigram: EpigramDetail;
}) {




  return (
    <DetailCardContainer>
    <DetailCardInner>
    <DetailCard>
      <TagContainer>
      <TagText>{epigram.tags.map((tag) => `#${tag.name}`).join(",  ")}</TagText>
      <Image
             src="/images/more_vertical.png"
             alt="메뉴"
             width={32}
             height={32}
             />
      </TagContainer>
      <MainText>{epigram.content}</MainText>
      <AuthorText>- {epigram.author} -</AuthorText>
      <BtnContainer>
        <LikeBtn>
        <Image
             src="/images/like.png"
             alt="좋아요"
             width={30}
             height={30}
             style={{ marginRight: "12px" }}
           />
           {epigram.likeCount}
        </LikeBtn>
        
        <LinkBtn
        onClick={() => window.open(epigram.referenceUrl, "_blank", "noopener,noreferrer")}
        >
            {epigram.referenceTitle}
        <Image
             src="/images/external_link.png"
             alt="링크"
             width={30}
             height={30}
             style={{ marginLeft: "12px" }}
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
             style={{ objectFit: "cover" }}
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
  height: 440px;
`;

const DetailCard = styled.div`
padding: 40px 20px 20px 20px;
margin-top: 20px;
max-width: 680px;
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
color:#373737;
`;

const TagText = styled.p`
font-family: IropkeBatangM;
font-size: 20px;
font-weight: 400;
line-height: 40px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#ABB8CE;
`;

const AuthorText = styled.p`
font-family: IropkeBatangM;
font-size: 22px;
font-weight: 400;
line-height: 40px;
text-align: right;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#ABB8CE;
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
color:#fff;
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
    border: 1px solid #ABABAB;
    border-radius: 100px;
    padding: 6px 24px;
font-family: Pretendard;
font-size: 20px;
font-weight: 600;
line-height: 32px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#ABABAB;
cursor: pointer;
/* &:hover {
    background-color: #373737;
  } */
`;