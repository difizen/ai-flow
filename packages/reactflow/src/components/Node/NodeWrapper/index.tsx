import { PopoverInNode } from '@/components/AIBasic/PopoverInNode/index';
import { HoverBlock } from '@/components/FlowController/operator';
import { NodePanelTypeEnum, type NodeType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import classNames from '@/utils/classnames';
import {
  RiContractUpDownLine,
  RiExpandUpDownLine,
  RiMoreLine,
  RiPlayLargeLine,
} from '@remixicon/react';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { PanelComponentMap } from '..';
import { useFlowsManagerStore } from '@/stores/flowsManagerStore';

export const NodeWrapper = (props: {
  nodeProps: NodeType;
  children?: React.ReactNode;
  leftHandler?: boolean;
  rightHandler?: boolean;
  rightHandlerConfig?: {
    id: string;
    style: Record<string, any>;
  }[];
  icon?: string;
  name?: string | React.ReactNode;
  extra?: React.ReactNode;
  folded?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const {
    nodeProps,
    children,
    leftHandler = true,
    rightHandler = true,
    rightHandlerConfig,
    icon,
    name,
    extra,
    className,
    onClick,
  } = props;
  const { name: defaultName, description, icon: defaultIcon } = nodeProps.data;
  const nodePanel = useFlowStore((state) => state.nodePanel);
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const takeSnapshot = useFlowsManagerStore((state) => state.takeSnapshot);

  const handlerClasses = 'w-[8px] h-[8px] bg-blue-500 rounded-full';

  const setNodeFolded = useFlowStore((state) => state.setNodeFolded);
  const getNode = useFlowStore((state) => state.getNode);
  const paste = useFlowStore((state) => state.paste);

  const Panel = PanelComponentMap[nodeProps.type!];

  const hasNodeContent =
    children || (nodePanel === NodePanelTypeEnum.InNode && Panel);

  return (
    <div
      className={classNames(
        'relative flex flex-col border-2 justify-center rounded-xl bg-white shadow-lg p-5 hover:shadow-2xl min-w-[300px] max-w-[500px]',
        nodeProps.selected || nodeProps.data.edited
          ? 'border-blue-500 shadow-2xl'
          : 'border-transparent',
        className
      )}
      onClick={onClick}
    >
      {nodeProps.selected && (
        <div className="absolute right-0 -top-10 flex items-center text-gray-500 bg-white rounded-lg p-[2px]">
          {hasNodeContent && (
            <HoverBlock
              tooltip={
                <div className="text-[15px] font-semibold">
                  {nodeProps.data.folded ? '展开' : '折叠'}
                </div>
              }
              onClick={() =>
                setNodeFolded(
                  nodeProps.data.id,
                  nodeProps.data.folded === undefined
                    ? true
                    : !nodeProps.data.folded
                )
              }
            >
              {nodeProps.data.folded ? (
                <RiExpandUpDownLine className="w-4" />
              ) : (
                <RiContractUpDownLine className="w-4" />
              )}
            </HoverBlock>
          )}
          <HoverBlock
            tooltip={<div className="text-[15px] font-semibold">测试节点</div>}
          >
            <RiPlayLargeLine className="w-4" />
          </HoverBlock>
          <PopoverInNode
            overlayInnerStyle={{ padding: 0 }}
            placement="bottomRight"
            trigger="hover"
            arrow={false}
            content={
              <div className="z-[9] p-1 bg-white rounded-lg shadow-sm border-[0.5px] border-gray-200 w-[126px]">
                <div
                  className="flex items-center justify-between h-8 px-3 rounded-lg hover:bg-gray-50 cursor-pointer text-[13px] text-gray-600"
                  onClick={() => {
                    const node = getNode(nodeProps.data.id);
                    if (!node) return;
                    takeSnapshot();
                    paste(
                      { nodes: [node], edges: [] },
                      {
                        x: node[0].position.x,
                        y: node[0].position.y,
                        paneX: 100,
                        paneY: 100,
                      }
                    );
                  }}
                >
                  复制
                </div>
                <div
                  onClick={() => {
                    takeSnapshot();
                    deleteNode(nodeProps.id);
                  }}
                  className="flex items-center justify-between h-8 px-3 rounded-lg hover:bg-red-50 cursor-pointer text-[13px] text-gray-600 hover:text-red-600"
                >
                  删除
                </div>
              </div>
            }
          >
            <HoverBlock>
              <RiMoreLine />
            </HoverBlock>
          </PopoverInNode>
        </div>
      )}

      <div className="flex w-full items-center justify-between gap-8 rounded-t-lg">
        <div className="flex items-center justify-between">
          {(defaultIcon || icon) && (
            <img
              src={icon ?? defaultIcon}
              className="h-8 rounded-xl shadow-md"
            />
          )}
          <div className="ml-2 truncate text-gray-700 font-medium">
            {name ?? defaultName}
          </div>
        </div>
        {extra}
      </div>
      {leftHandler && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ borderColor: 'rgb(59 130 246)' }}
          className={classNames('-ml-0.5 ', handlerClasses)}
        />
      )}
      {rightHandler &&
        (rightHandlerConfig ? (
          <>
            {rightHandlerConfig.map((item) => (
              <Handle
                key={item.id}
                id={item.id}
                type="source"
                position={Position.Right}
                style={{ borderColor: 'rgb(59 130 246)', ...item.style }}
                className={classNames('-mr-0.5 ', handlerClasses)}
              />
            ))}
          </>
        ) : (
          <Handle
            type="source"
            position={Position.Right}
            style={{ borderColor: 'rgb(59 130 246)' }}
            className={classNames('-mr-0.5 ', handlerClasses)}
          />
        ))}

      {description && (
        <div className="h-full w-full text-gray-400 pb-1 pt-2">
          <div className="w-full pb-2 text-sm truncate">{description}</div>
        </div>
      )}
      {!nodeProps.data.folded && hasNodeContent && (
        <div className="pt-2">
          {children}
          {nodePanel === NodePanelTypeEnum.InNode && Panel && (
            <Panel data={nodeProps.data} />
          )}
        </div>
      )}
    </div>
  );
};
