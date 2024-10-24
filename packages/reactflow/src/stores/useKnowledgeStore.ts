import type { BasicSchema } from '@/interfaces/flow';
import { create } from 'zustand';

export interface Knowledge {
  name: string;
  id: string;
  description?: string;
}

export type KnowledgeSelectorNode =
  | ((props: { nodeId: string; knowledgeParam: BasicSchema[] }) => JSX.Element)
  | null;

export interface KnowledgeStoreType {
  KnowledgeSelector: KnowledgeSelectorNode | null;
  setKnowledgeSelector: (KnowledgeSelector: KnowledgeSelectorNode) => void;
}

export const useKnowledgeStore = create<KnowledgeStoreType>((set) => ({
  KnowledgeSelector: null,
  setKnowledgeSelector: (KnowledgeSelector) => {
    set({ KnowledgeSelector });
  },
}));
