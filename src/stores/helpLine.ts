import type { Node } from '@xyflow/react';
import { create } from 'zustand';
import { useFlowStore } from './flowStore';

export type HelpLineHorizontalPosition = {
  top: number;
  left: number;
  width: number;
};

export type HelpLineVerticalPosition = {
  top: number;
  left: number;
  height: number;
};

export interface HelpLineStoreType {
  helpLineHorizontal?: HelpLineHorizontalPosition | undefined;
  setHelpLineHorizontal: (
    helpLineHorizontal?: HelpLineHorizontalPosition,
  ) => void;
  helpLineThreshold: number;
  setHelpLineThreshold: (helpLineThreshold: number) => void;
  helpLineVertical?: HelpLineVerticalPosition;
  setHelpLineVertical: (helpLineVertical?: HelpLineVerticalPosition) => void;
  showHorizontalHelpLine: (node: Node) => Node[];
  showVerticalHelpLine: (node: Node) => Node[];
}

export const useHelpLine = create<HelpLineStoreType>((set, get) => {
  return {
    setHelpLineHorizontal: (helpLineHorizontal) => {
      set({ helpLineHorizontal });
    },
    setHelpLineVertical: (helpLineVertical) => {
      set({ helpLineVertical });
    },
    helpLineThreshold: 20,
    setHelpLineThreshold: (helpLineThreshold) => {
      set({ helpLineThreshold });
    },
    showHorizontalHelpLine: (node) => {
      const { nodes } = useFlowStore.getState();
      const showHorizontalHelpLineNodes = nodes
        .filter((n) => {
          if (n.id === node.id) return false;

          const nY = Math.ceil(n.position.y);
          const nodeY = Math.ceil(node.position.y);

          if (Math.abs(nY - nodeY) < get().helpLineThreshold) return true;

          return false;
        })
        .sort((a, b) => a.position.x - b.position.x);
      const showHorizontalHelpLineNodesLength =
        showHorizontalHelpLineNodes.length;

      if (showHorizontalHelpLineNodesLength > 0) {
        const first = showHorizontalHelpLineNodes[0];
        const last =
          showHorizontalHelpLineNodes[showHorizontalHelpLineNodesLength - 1];

        const helpLine = {
          top: first.position.y,
          left: first.position.x,
          width:
            last.position.x + (last.measured?.width ?? 0) - first.position.x,
        };

        if (node.position.x < first.position.x) {
          helpLine.left = node.position.x;
          helpLine.width =
            last.position.x + (last.measured?.width ?? 0) - node.position.x;
        }

        if (node.position.x > last.position.x) {
          helpLine.width =
            node.position.x + (node.measured?.width ?? 0) - first.position.x;
        }
        get().setHelpLineHorizontal(helpLine);
        return showHorizontalHelpLineNodes;
      } else {
        get().setHelpLineHorizontal();
        return [];
      }
    },
    showVerticalHelpLine: (node) => {
      const { nodes } = useFlowStore.getState();
      const showVerticalHelpLineNodes = nodes
        .filter((n) => {
          if (n.id === node.id) return false;

          const nX = Math.ceil(n.position.x);
          const nodeX = Math.ceil(node.position.x);

          if (Math.abs(nX - nodeX) < get().helpLineThreshold) return true;

          return false;
        })
        .sort((a, b) => a.position.y - b.position.y);
      const showVerticalHelpLineNodesLength = showVerticalHelpLineNodes.length;
      if (showVerticalHelpLineNodesLength > 0) {
        const first = showVerticalHelpLineNodes[0];
        const last =
          showVerticalHelpLineNodes[showVerticalHelpLineNodesLength - 1];

        const helpLine = {
          top: first.position.y,
          left: first.position.x,
          height:
            last.position.y + (last.measured?.height ?? 0) - first.position.y,
        };

        if (node.position.y < first.position.y) {
          helpLine.top = node.position.y;
          helpLine.height =
            last.position.y + (last.measured?.height ?? 0) - node.position.y;
        }

        if (node.position.y > last.position.y)
          helpLine.height =
            node.position.y + (node.measured?.height ?? 0) - first.position.y;

        get().setHelpLineVertical(helpLine);
        return showVerticalHelpLineNodes;
      } else {
        get().setHelpLineVertical();
        return [];
      }
    },
  };
});
