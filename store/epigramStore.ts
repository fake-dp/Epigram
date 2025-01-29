import { create } from "zustand";

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

interface EpigramStore {
  epigrams: Epigram[];
  setEpigrams: (epigrams: Epigram[]) => void;
}

const dummyEpigrams: Epigram[] = [
    {
      id: 1,
      likeCount: 12,
      tags: [{ name: "인생", id: 201 }, { name: "성장", id: 202 }],
      writerId: 301,
      referenceUrl: "https://naver.com1",
      referenceTitle: "삶의 지혜",
      author: "작가 1",
      content: "삶은 매일 새로운 기회를 제공하지만, 이를 알아보는 것은 우리의 몫이다. 주어진 시간에 최선을 다하라.",
    },
    {
      id: 2,
      likeCount: 8,
      tags: [{ name: "지혜", id: 203 }, { name: "철학", id: 204 }],
      writerId: 302,
      referenceUrl: "https://naver.com2",
      referenceTitle: "지혜로운 삶",
      author: "작가 2",
      content: "지혜는 경험에서 나오는 것이 아니라, 경험을 어떻게 활용하느냐에 따라 결정된다.",
    },
    {
      id: 3,
      likeCount: 20,
      tags: [{ name: "도전", id: 205 }, { name: "희망", id: 206 }],
      writerId: 303,
      referenceUrl: "https://naver.com3",
      referenceTitle: "희망의 등불",
      author: "작가 3",
      content: "어두운 밤이 길수록 새벽은 더욱 찬란하다. 어려움 속에서도 희망을 잃지 마라.",
    },
    {
      id: 4,
      likeCount: 15,
      tags: [{ name: "사랑", id: 207 }, { name: "공감", id: 208 }],
      writerId: 304,
      referenceUrl: "https://naver.com4",
      referenceTitle: "사랑의 정의",
      author: "작가 4",
      content: "사랑은 서로 다른 두 마음이 하나로 연결되는 순간에 서로가 사랑하게 된다.",
    },
    {
      id: 5,
      likeCount: 25,
      tags: [{ name: "책", id: 209 }, { name: "독서", id: 210 }],
      writerId: 305,
      referenceUrl: "https://naver.com5",
      referenceTitle: "독서의 즐거움",
      author: "작가 5",
      content: "책을 읽는다는 것은 새로운 세상으로 떠나는 여행과 같다. 독서는 우리의 영혼을 풍요롭게 한다.",
    },
    {
      id: 6,
      likeCount: 18,
      tags: [
        { name: "자기계발", id: 211 },
        { name: "목표", id: 212 },
        { name: "성취", id: 213 },
      ],
      writerId: 306,
      referenceUrl: "https://naver.com6",
      referenceTitle: "목표를 이루는 법",
      author: "작가 6",
      content: "작은 목표를 이루는 것이 큰 목표를 달성하는 첫걸음이다. 꾸준히 걸어가는 것이 중요하다.",
    },
  ];
  

export const useEpigramStore = create<EpigramStore>((set) => ({
  epigrams: dummyEpigrams, // 기본값으로 더미 데이터 설정
  setEpigrams: (epigrams) => set({ epigrams }),
}));
