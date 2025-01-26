"use client";

import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f7f9fc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderLeftContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const LeftTextBtn = styled.p`
font-family: Pretendard;
font-size: 16px;
font-weight: 600;
line-height: 26px;
text-align: center;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#373737;
margin-left: 30px;
padding: 4px 10px 4px 10px;
cursor: pointer;
`;

const HeaderRigthContainer = styled.div`
    padding: 4px 10px 4px 10px;
    display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const UserBtn = styled.p`
font-family: Pretendard;
font-size: 14px;
font-weight: 500;
line-height: 24px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color:#ABABAB;
margin-left: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #2D394E;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #2d394eef;
  }
`;

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuthStore();
  console.log('user',user)

  return (
    <HeaderContainer>
        <HeaderLeftContainer>
        <Image
          src="/images/logo.png"
          alt="로고"
          width={132}
          height={36}
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
       {isLoggedIn && <LeftTextBtn onClick={() => router.push("/epigramlist")}>피드</LeftTextBtn>}
        </HeaderLeftContainer>
      {isLoggedIn ? (
        <HeaderRigthContainer onClick={logout}>
        <Image
          src="/images/user.png"
          alt="유저"
          width={24}
          height={24}
        />
          <UserBtn>{user?.nickname}</UserBtn>
        </HeaderRigthContainer>
      ) : (
         <Button onClick={() => router.push("/login")}>로그인</Button>
      )}
    </HeaderContainer>
  );
}
