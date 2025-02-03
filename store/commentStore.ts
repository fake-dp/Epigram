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
  comments: { [epigramId: number]: Comment[] };
  totalCount: { [epigramId: number]: number };
  cursor: { [epigramId: number]: number | null };
  hasMore: { [epigramId: number]: boolean };
  isLoading: { [epigramId: number]: boolean };

  fetchComments: (epigramId: number, limit: number) => Promise<void>;
  addComment: (epigramId: number, newComment: Comment) => void;
  deleteComment: (epigramId: number, commentId: number) => void;
  editCommentId: number | null;
  setEditCommentId: (commentId: number | null) => void;
  updateComment: (epigramId: number, commentId: number, content: string) => void;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: {},
  totalCount: {},
  cursor: {},
  hasMore: {},
  isLoading: {},
  editCommentId: null,

  fetchComments: async (epigramId, limit) => {
    const state = get();
    if (state.isLoading[epigramId] || state.hasMore[epigramId] === false) return;

    set((prevState) => ({
      ...prevState,
      isLoading: { ...prevState.isLoading, [epigramId]: true },
    }));

    try {
      const response = await getEpigramComments(
        epigramId,
        limit,
        state.cursor[epigramId] || undefined,
      );
      const newComments = response.list;
      const nextCursor = response.nextCursor || null;

      set((prevState) => ({
        comments: {
          ...prevState.comments,
          [epigramId]: [...(prevState.comments[epigramId] || []), ...newComments],
        },
        totalCount: { ...prevState.totalCount, [epigramId]: response.totalCount },
        cursor: { ...prevState.cursor, [epigramId]: nextCursor },
        hasMore: { ...prevState.hasMore, [epigramId]: newComments.length === limit },
      }));
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    } finally {
      set((prevState) => ({
        isLoading: { ...prevState.isLoading, [epigramId]: false },
      }));
    }
  },

  addComment: (epigramId, newComment) => {
    set((prevState) => ({
      comments: {
        ...prevState.comments,
        [epigramId]: [newComment, ...(prevState.comments[epigramId] || [])],
      },
      totalCount: {
        ...prevState.totalCount,
        [epigramId]: (prevState.totalCount[epigramId] || 0) + 1,
      },
    }));
  },

  deleteComment: (epigramId, commentId) => {
    set((prevState) => ({
      comments: {
        ...prevState.comments,
        [epigramId]: prevState.comments[epigramId].filter((comment) => comment.id !== commentId),
      },
      totalCount: {
        ...prevState.totalCount,
        [epigramId]: Math.max((prevState.totalCount[epigramId] || 0) - 1, 0),
      },
    }));
  },

  updateComment: (epigramId, commentId, content) => {
    set((prevState) => ({
      comments: {
        ...prevState.comments,
        [epigramId]: prevState.comments[epigramId].map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment,
        ),
      },
    }));
  },

  setEditCommentId: (commentId) => set({ editCommentId: commentId }),
}));
