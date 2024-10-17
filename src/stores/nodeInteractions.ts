import type { Node } from '@xyflow/react';
import { produce } from 'immer';
import { create } from 'zustand';
import { useFlowStore } from './flowStore';
import { useHelpLine } from './helpLine';

export interface NodeInteractionsStoreType {
  dragNodeStartPosition: { x: number; y: number };
  setNodeDragStartPosition: (x: number, y: number) => void;
  onNodeDragStart: (node: Node) => void;
  onNodeDrag: (node: Node) => void;
  onNodeDragEnd: (node: Node) => void;
}

export const useNodeInteractions = create<NodeInteractionsStoreType>(
  (set, get) => {
    return {
      dragNodeStartPosition: { x: 0, y: 0 },
      setNodeDragStartPosition: (x, y) => {
        set({ dragNodeStartPosition: { x, y } });
      },
      onNodeDragStart: (node) => {
        get().setNodeDragStartPosition(node.position.x, node.position.y);
      },

      onNodeDrag: (node) => {
        const { showHorizontalHelpLine, showVerticalHelpLine } =
          useHelpLine.getState();
        const showHorizontalHelpLineNodes = showHorizontalHelpLine(node);
        const showVerticalHelpLineNodes = showVerticalHelpLine(node);

        const { nodes, setNodes } = useFlowStore.getState();
        const newNodes = produce(nodes, (draft) => {
          const currentNode = draft.find((n) => n.id === node.id)!;

          if (showVerticalHelpLineNodes.length > 0)
            currentNode.position.x = showVerticalHelpLineNodes[0].position.x;
          else currentNode.position.x = node.position.x;

          if (showHorizontalHelpLineNodes.length > 0)
            currentNode.position.y = showHorizontalHelpLineNodes[0].position.y;
          else currentNode.position.y = node.position.y;
        });

        setNodes(newNodes);
      },
      onNodeDragEnd: (node) => {
        const { setHelpLineHorizontal, setHelpLineVertical } =
          useHelpLine.getState();
        const { x, y } = get().dragNodeStartPosition;
        if (!(x === node.position.x && y === node.position.y)) {
          setHelpLineHorizontal();
          setHelpLineVertical();
        }
      },
    };
  },
);
