import { axiosInstance } from "@/lib/instance/axios";
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse} from "../instance/types";

// 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/signIn", data);
  return response.data;
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await axiosInstance.post<SignUpResponse>("/auth/signUp", data);
  return response.data;
};