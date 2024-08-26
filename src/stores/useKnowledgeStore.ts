import { create } from 'zustand';

export interface Knowledge {
  name: string;
  id: string;
  description?: string;
}

export interface KnowledgeStoreType {
  knowledges: Knowledge[];
  setKnowledges: (knowledges: Knowledge[]) => void;
}

export const useKnowledgeStore = create<KnowledgeStoreType>((set) => ({
  knowledges: [],
  setKnowledges: (knowledges: Knowledge[]) => {
    set({ knowledges });
  },
}));
