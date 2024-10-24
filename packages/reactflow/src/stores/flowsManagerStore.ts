import { SAVE_DEBOUNCE_TIME } from '@/constants/constant';
import { getLayoutByDagre } from '@/utils/index';
import { type Edge, type Node } from '@xyflow/react';
import { produce } from 'immer';
import { cloneDeep, debounce } from 'lodash';
import { create } from 'zustand';

import { useFlowStore } from './flowStore';

interface FlowsManagerStoreType {
  hasPast: () => boolean;
  hasFuture: () => boolean;
  autoLayout: () => Promise<any>;
  autoSaving: boolean;
  setAutoSaving: (autoSaving: boolean) => void;
  autoSavingInterval: number;
  setAutoSavingInterval: (autoSavingInterval: number) => void;
  saveLoading: boolean;
  setSaveLoading: (saveLoading: boolean) => void;
  autoSaveFlow?: (() => void) | undefined;
  undo: () => void;
  redo: () => void;
  takeSnapshot: () => void;
  setNodesFolded: (folded: boolean) => void;
  saveFlow: () => void;
  setSaveFlow: (saveFlow: () => void) => void;
  savedAt: string;
  setSavedAt: (savedAt: string) => void;
  initializeAutoSaveFlow: () => void;
}

export type UseUndoRedoOptions = {
  maxHistorySize: number;
  enableShortcuts: boolean;
};

interface Snap {
  nodes: Node[];
  edges: Edge[];
}

const defaultOptions: UseUndoRedoOptions = {
  maxHistorySize: 100,
  enableShortcuts: true,
};

let past: Snap[] = [];

let future: Snap[] = [];

// flow 的基本操作：撤销重做、快照生产、自动布局、初始化
export const useFlowsManagerStore = create<FlowsManagerStoreType>(
  (set, get) => {
    return {
      // auto save
      autoLayout: () => {
        return new Promise((resolve) => {
          const { nodes, edges, setNodes } = useFlowStore.getState();
          const layout = getLayoutByDagre(nodes, edges);

          const newNodes = produce(nodes, (draft) => {
            draft.forEach((node) => {
              const nodeWithPosition = layout.node(node.id);

              node.position = {
                x: nodeWithPosition.x - (node.measured?.width || 0) / 2,
                y: nodeWithPosition.y - (node.measured?.height || 0) / 2,
              };
            });
          });
          setNodes(newNodes);
          resolve(true);
        }).then((res) => {
          if (res) {
            const { reactFlowInstance } = useFlowStore.getState();

            return reactFlowInstance?.fitView();
          }
          return;
        });
      },
      autoSaving: true,
      saveLoading: false,
      saveFlow: () => {
        get().setSavedAt(new Date().toISOString());
      },
      setNodesFolded: (folded: boolean) => {
        const { setNodeFolded, nodes } = useFlowStore.getState();
        nodes.forEach((n) => setNodeFolded(n.id, folded));
        get().takeSnapshot();
      },
      setSaveFlow: (saveFlow: () => void) => set({ saveFlow }),
      setSaveLoading: (saveLoading: boolean) => set({ saveLoading }),
      setAutoSaving: (autoSaving: boolean) => set({ autoSaving }),
      autoSavingInterval: SAVE_DEBOUNCE_TIME,
      setAutoSavingInterval: (autoSavingInterval: number) =>
        set({ autoSavingInterval }),
      autoSaveFlow: undefined,
      hasPast: () => {
        return past && past.length > 0;
      },
      hasFuture: () => {
        return future && future.length > 0;
      },
      savedAt: '未保存',
      setSavedAt: (savedAt: string) => set({ savedAt }),
      initializeAutoSaveFlow: () => {
        const interval = get().autoSavingInterval;
        const autoSaveFlow = debounce(() => {
          get().saveFlow();
          // 在这里执行自动保存的逻辑
        }, interval);
        set({ autoSaveFlow });
      },

      // redo undo
      takeSnapshot: () => {
        const flowStore = useFlowStore.getState();
        const newState = {
          nodes: cloneDeep(flowStore.nodes),
          edges: cloneDeep(flowStore.edges),
        };
        const pastLength = past?.length ?? 0;
        if (
          pastLength > 0 &&
          JSON.stringify(past[pastLength - 1]) === JSON.stringify(newState)
        ) {
          return;
        }
        if (pastLength > 0) {
          past = past.slice(
            pastLength - defaultOptions.maxHistorySize + 1,
            pastLength
          );

          past.push(newState);
        } else {
          past = [newState];
        }

        future = [];
      },
      undo: () => {
        const newState = useFlowStore.getState();

        const pastLength = past?.length ?? 0;
        const pastState = past?.[pastLength - 1] ?? null;

        if (pastState) {
          past = past.slice(0, pastLength - 1);

          if (!future) {
            future = [];
          }
          future.push({
            nodes: newState.nodes,
            edges: newState.edges,
          });

          newState.setNodes(pastState.nodes);
          newState.setEdges(pastState.edges);
        }
      },
      redo: () => {
        const newState = useFlowStore.getState();

        const futureLength = future?.length ?? 0;
        const futureState = future?.[futureLength - 1] ?? null;

        if (futureState) {
          future = future.slice(0, futureLength - 1);

          if (!past) {
            past = [];
          }
          past.push({
            nodes: newState.nodes,
            edges: newState.edges,
          });

          newState.setNodes(futureState.nodes);
          newState.setEdges(futureState.edges);
        }
      },
    };
  }
);
