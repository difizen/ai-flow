import { NodeType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import { RiCloseLine } from '@remixicon/react';
import React, { useMemo } from 'react';
import { PanelComponentMap } from '../Node';
import { PanelWrapper } from './panelWrapper';

export const NodeConfigPanel = (props: {
  node: NodeType;
  className?: string;
}) => {
  const { node, className } = props;
  const nodeType = node.type;
  const nodeData = node.data;

  const Panel = useMemo(() => {
    return PanelComponentMap[nodeType!];
  }, [nodeType, nodeData.type]);

  const setNode = useFlowStore((state) => state.setNode);

  const cancelSelect = () => {
    setNode(nodeData.id, {
      ...node,
      data: {
        ...nodeData,
        edited: false,
      },
    });
  };

  if (!Panel) return null;

  return (
    <PanelWrapper className={className}>
      <div className="p-3 sticky top-0 border-b-[0.5px] border-black/5 z-[10] bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={nodeData.icon} className="h-8 rounded-xl shadow-md" />
            <div className="truncate text-gray-700 font-medium">
              {nodeData.name}
            </div>
          </div>
          <div className="flex gap-2">
            <RiCloseLine
              onClick={cancelSelect}
              className="w-5 text-gray-400 cursor-pointer"
            ></RiCloseLine>
          </div>
        </div>
        <div className="text-gray-400 text-xs truncate mt-2">
          {nodeData.description}
        </div>
      </div>
      {<Panel data={nodeData} />}
    </PanelWrapper>
  );
};
