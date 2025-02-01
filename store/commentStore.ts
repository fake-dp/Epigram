import { create } from 'zustand';
import { getEpigramComments } from '@/lib/apis/comment';

interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

interface Comment {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  epigramId: number;
}

interface CommentStore {
  comments: Comment[];
  fetchComments: (epigramId: number, limit: number) => Promise<void>;
  addComment: (newComment: Comment) => void;
  deleteComment: (commentId: number) => void;
  editCommentId: number | null;
  setEditCommentId: (commentId: number | null) => void;
  updateComment: (commentId: number, content: string) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  editCommentId: null,
  fetchComments: async (epigramId, limit) => {
    try {
      const response = await getEpigramComments(epigramId, limit);
      set({ comments: response.list });
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  },
  addComment: (newComment) => {
    set((state) => ({
      comments: [newComment, ...state.comments],
    }));
  },
  deleteComment: (commentId) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    }));
  },
  setEditCommentId: (commentId) => set({ editCommentId: commentId }),

  updateComment: (commentId, content) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId ? { ...comment, content } : comment,
      ),
    }));
  },
}));
