"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
`

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 780px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f9fc;
  background-image: url('/images/landing_bg.png');
  background-size: cover;
  background-position: center;
`;


const StyledImage = styled.div`
  animation: ${fadeIn} 2s ease-in-out;
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  height: 10px;
  justify-content: center;
  background-color: #f5f5f5;
`;

const CtContainer = styled.div`
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 100px;
`;

const CtContainerBox = styled.div`
    display: flex;
    align-items: flex-end;
    gap:60px;
    padding: 100px 0 200px 0;

    @media (max-width: 960px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const LastCtContainer = styled.div`
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 100px;
`;

const CtTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    &.mid {
   text-align: end;
  }
`;

const CtMainText = styled.h2`
font-family: Pretendard;
font-size: 32px;
font-weight: 700;
line-height: 44px;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #050505;

&.ctlast {
    margin-bottom: 30px;
  }

&.last {
    margin-bottom: 80px;
  }
`;

const CtSubText = styled.p`
font-family: Pretendard;
font-size: 22px;
font-weight: 500;
line-height: 32px;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: #6A82A9;
`;

export default function Home() {
  return (
    <Container>
    {/* 렌딩 메인 인트로 */}
    <Main>
      <StyledImage>
        <Image
          src="/images/landing_main_text.png"
          alt="랜딩 메인 텍스트"
          width={300}
          height={500}
          priority
        />
      </StyledImage>
    </Main>
    <Divider>
        <Image
          src="/images/landing_line.png"
          alt="경계선"
          width={1920}
          height={10}
          style={{ objectFit: "cover" }}
        />
      </Divider>
     {/* 메인 렌딩 컨텐츠 파트1 */}
     <CtContainer>
        <CtContainerBox>
        <Image
          src="/images/landing_1_ct.png"
          alt="랜딩 메인 컨텐츠1"
          width={560}
          height={360}
          priority
          />
          <CtTextContainer>
           <CtMainText>명언이나 글귀,</CtMainText>
           <CtMainText className="ctlast">토막 상식들을 공유해 보세요.</CtMainText>
           <CtSubText>나만 알던 소중한 글들을</CtSubText>
           <CtSubText>다른 사람들에게 전파하세요.</CtSubText>
          </CtTextContainer>
        </CtContainerBox>

        <CtContainerBox>
        <CtTextContainer className="mid">
           <CtMainText>감정 상태에 따라,</CtMainText>
           <CtMainText className="ctlast">알맞은 위로를 받을 수 있어요.</CtMainText>
           <CtSubText>태그를 통해 글을 모아 볼 수 있어요.</CtSubText>
          </CtTextContainer>
        <Image
          src="/images/landing_2_ct.png"
          alt="랜딩 메인 컨텐츠2"
          width={560}
          height={360}
          priority
          />
        </CtContainerBox>

        <CtContainerBox>
        <Image
          src="/images/landing_3_ct.png"
          alt="랜딩 메인 컨텐츠3"
          width={560}
          height={360}
          priority
          />
          <CtTextContainer>
           <CtMainText>내가 요즘 어떤 감정 상태인지</CtMainText>
           <CtMainText className="ctlast">통계로 한눈에 볼 수 있어요.</CtMainText>
           <CtSubText>감정 달력으로</CtSubText>
           <CtSubText>내 마음에 담긴 감정을 확인해보세요.</CtSubText>
          </CtTextContainer>
        </CtContainerBox>
     </CtContainer>

     {/* 메인 렌딩 컨텐츠 파트2 */}
     <LastCtContainer>
     <CtMainText>사용자들이 직접</CtMainText>
     <CtMainText className="last">인용한 에피그램들</CtMainText>
     <Image
          src="/images/landing_last_ct.png"
          alt="랜딩 메인 텍스트"
          width={500}
          height={540}
          priority
          />
     </LastCtContainer>

     {/* 메인 렌딩 푸터 */}
      <Divider>
        <Image
          src="/images/landing_footer_line.png"
          alt="경계선"
          width={1920}
          height={10}
          style={{ objectFit: "cover" }}
        />
      </Divider>
       <Main>
      <StyledImage>
        <Image
          src="/images/landing_footer_text.png"
          alt="랜딩 푸터 텍스트"
          width={184}
          height={105}
          priority
        />
      </StyledImage>
    </Main>
</Container>
  );
}
