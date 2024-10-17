import { NodeType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import classNames from '@/utils/classnames';
import React from 'react';
import { NodeConfigPanel } from './nodeConfig';

export const Panel = (props: { className?: string }) => {
  const nodes = useFlowStore((state) => state.nodes);
  const editedNodes = nodes.filter((node) => node.data.edited);

  return (
    <div
      tabIndex={-1}
      className={classNames(
        'absolute top-14 right-0 bottom-2 flex z-10 outline-none',
        props.className,
      )}
    >
      {editedNodes.length > 0 && (
        <NodeConfigPanel node={editedNodes[0] as NodeType}></NodeConfigPanel>
      )}
    </div>
  );
};
