import { axiosInstance } from "@/lib/instance/axios";
import { EpigramCreateRequest, EpigramCreateResponse, EpigramDetailResponse} from "../instance/types";


// 리스트 받아오기
export const getEpigramList = async (limit: number, cursor?: number) => {
    const response = await axiosInstance.get(`/epigrams`, {
      params: {
        limit,
        cursor,
      },
    });
    return response.data;
  };
  
  // 에피그램 생성
  export const createEpigram = async (
    data: EpigramCreateRequest
  ): Promise<EpigramCreateResponse> => {
    const response = await axiosInstance.post<EpigramCreateResponse>("/epigrams", data);
    return response.data;
  };
  
  // 상세 조회
  export const getEpigramDetail = async (
    id: number
  ): Promise<EpigramDetailResponse> => {
    const response = await axiosInstance.get<EpigramDetailResponse>(`/epigrams/${id}`);
    return response.data;
  };
  