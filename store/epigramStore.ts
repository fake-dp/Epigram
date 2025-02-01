import { create } from 'zustand';
import { likeEpigram, unlikeEpigram } from '@/lib/apis/epigram';

interface Epigram {
  likeCount: number;
  tags: { name: string; id: number }[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
}

interface EpigramDetail extends Epigram {
  isLiked: boolean;
}

interface EpigramStore {
  epigrams: Epigram[];
  epigramDetail: EpigramDetail | null;
  setEpigrams: (epigrams: Epigram[]) => void;
  addEpigrams: (newEpigrams: Epigram[]) => void;
  setEpigramDetail: (epigram: EpigramDetail | null) => void;
  toggleLike: () => Promise<void>;
}

export const useEpigramStore = create<EpigramStore>((set, get) => ({
  epigrams: [],
  epigramDetail: null,
  setEpigrams: (epigrams) => set({ epigrams }),
  addEpigrams: (newEpigrams) => set((state) => ({ epigrams: [...state.epigrams, ...newEpigrams] })),
  setEpigramDetail: (epigram) => set({ epigramDetail: epigram }),

  toggleLike: async () => {
    const epigram = get().epigramDetail;
    if (!epigram) return;

    try {
      let updatedLikeCount = epigram.likeCount;
      let updatedIsLiked = epigram.isLiked;

      if (epigram.isLiked) {
        await unlikeEpigram(epigram.id);
        updatedLikeCount -= 1;
        updatedIsLiked = false;
      } else {
        await likeEpigram(epigram.id);
        updatedLikeCount += 1;
        updatedIsLiked = true;
      }

      set({
        epigramDetail: {
          ...epigram,
          likeCount: updatedLikeCount,
          isLiked: updatedIsLiked,
        },
      });
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 기능을 사용할 수 없습니다.');
    }
  },
}));
