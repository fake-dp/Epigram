import { axiosInstance } from '@/lib/instance/axios';

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  interface LoginRequest {
    email: string;
    password: string;
  }
  
  export const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/signIn", {
        email,
        password,
      });
      console.log("로그인 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  };