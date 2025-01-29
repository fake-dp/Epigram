// 로그인 관련 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}


// 회원가입 관련 타입
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
  };
}

// epigrams 관련 타입
export interface EpigramTag {
  name: string;
  id: number;
}

export interface EpigramListResponse {
  totalCount: number;
  nextCursor: number;
  list: {
    likeCount: number;
    tags: EpigramTag[];
    writerId: number;
    referenceUrl: string;
    referenceTitle: string;
    author: string;
    content: string;
    id: number;
  }[];
}

export interface EpigramCreateRequest {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

export interface EpigramCreateResponse {
  likeCount: number;
  tags: EpigramTag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
}

export interface EpigramDetailResponse {
  likeCount: number;
  tags: EpigramTag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}

export interface EpigramUpdateRequest {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

export interface EpigramUpdateResponse {
  likeCount: number;
  tags: { name: string; id: number }[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
}