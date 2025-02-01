import { axiosInstance } from '@/lib/instance/axios';
import { CommentRequest, CommentResponse } from '../instance/types';

// 댓글 리스트 가져오기
export const getEpigramComments = async (epigramId: number, limit: number, cursor?: number) => {
  const response = await axiosInstance.get(`/epigrams/${epigramId}/comments`, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};

// 댓글 등록하기
export const createEpigramComment = async (data: CommentRequest): Promise<CommentResponse> => {
  const response = await axiosInstance.post<CommentResponse>('/comments', data);
  console.log('댓글 등록 API 응답:', response.data);
  return response.data;
};

// 댓글 삭제 API
export const deleteEpigramComment = async (commentId: number) => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
};

// 댓글 수정 API
export const updateEpigramComment = async (
  commentId: number,
  content: string,
  isPrivate: boolean,
) => {
  try {
    await axiosInstance.patch(`/comments/${commentId}`, { content, isPrivate });
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
};
