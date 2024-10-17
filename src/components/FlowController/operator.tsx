import { useFlowsManagerStore } from '@/stores/flowsManagerStore';
import classNames from '@/utils/classnames';
import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiColorFilterLine,
  RiContractUpDownLine,
  RiCursorLine,
  RiExpandUpDownLine,
  RiFullscreenLine,
  RiHand,
  RiZoomInLine,
  RiZoomOutLine,
} from '@remixicon/react';
import { useReactFlow, useViewport } from '@xyflow/react';
import { Divider } from 'antd';
import { memo, type HTMLAttributes } from 'react';

import { ControlMode } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import React from 'react';
import { Popup } from '../AIBasic/Popup/index';
import { TipPopup } from '../AIBasic/TipPopup/index';

interface HoverBlockProps extends HTMLAttributes<HTMLDivElement> {
  tooltip?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

export const HoverBlock = (props: HoverBlockProps) => {
  const {
    children,
    className,
    tooltip,
    disabled = false,
    selected = false,
  } = props;

  const Inner = (
    <div
      {...props}
      className={classNames(
        'flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer hover:bg-black/5',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        selected && 'bg-blue-400/20 hover:bg-blue-400/20',
        className,
      )}
    >
      <div className={selected ? 'text-blue-400 text:bg-blue-400' : ''}>
        {children}
      </div>
    </div>
  );

  if (!tooltip) {
    return Inner;
  }

  return <TipPopup title={tooltip}>{Inner}</TipPopup>;
};

const zoomOptions: ('Fit' | number)[] = [25, 50, 100, 125, 'Fit'];

const OperatorRaw = () => {
  const { zoomIn, zoomOut, zoomTo, fitView } = useReactFlow();
  const { zoom } = useViewport();

  const handleZoom = (type: 'Fit' | number) => {
    if (typeof type === 'number') {
      zoomTo(type / 100);
      return;
    }

    fitView();
  };

  const undo = useFlowsManagerStore((state) => state.undo);
  const redo = useFlowsManagerStore((state) => state.redo);
  const hasPast = useFlowsManagerStore((state) => state.hasPast);
  const hasFuture = useFlowsManagerStore((state) => state.hasFuture);
  const autoLayout = useFlowsManagerStore((state) => state.autoLayout);
  const setNodesFolded = useFlowsManagerStore((state) => state.setNodesFolded);
  const takeSnapshot = useFlowsManagerStore((state) => state.takeSnapshot);

  const setControlMode = useFlowStore((state) => state.setControlMode);
  const controlMode = useFlowStore((state) => state.controlMode);

  return (
    <div className="flex items-center mt-1 gap-2 absolute left-4 bottom-4 z-[9]">
      <div className="p-0.5 h-9 cursor-pointer text-[13px] text-gray-500 font-medium rounded-lg bg-white shadow-lg border-[0.5px] border-gray-100 w-[100%]">
        <div className="flex items-center justify-between h-8 rounded-lg">
          <HoverBlock
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
          >
            <RiZoomOutLine className="w-4 h-4" />
          </HoverBlock>
          <Popup
            panel={
              <>
                {zoomOptions.map((n) => (
                  <div
                    key={n}
                    onClick={() => handleZoom(n)}
                    className="flex items-center justify-between px-3 h-8 rounded-lg hover:bg-gray-50 cursor-pointer text-[13px] text-gray-600"
                  >
                    {typeof n === 'number' ? n + '%' : '自适应'}
                  </div>
                ))}
              </>
            }
            panelProps={{ anchor: { to: 'top', gap: 6 } }}
          >
            <HoverBlock className="w-10">{Math.round(zoom * 100)}%</HoverBlock>
          </Popup>

          <HoverBlock
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
          >
            <RiZoomInLine className="w-4 h-4" />
          </HoverBlock>
          <HoverBlock
            tooltip="自适应"
            onClick={(e) => {
              e.stopPropagation();
              fitView();
            }}
          >
            <RiFullscreenLine className="w-4 h-4" />
          </HoverBlock>
        </div>
      </div>
      <div className="p-0.5 h-9 cursor-pointer text-[13px] text-gray-500 font-medium rounded-lg bg-white shadow-lg border-[0.5px] border-gray-100 w-[100%]">
        <div className="flex items-center justify-between h-8 rounded-lg">
          <HoverBlock
            tooltip="撤销"
            onClick={(e) => {
              e.stopPropagation();
              undo();
            }}
            disabled={!hasPast()}
          >
            <RiArrowGoBackLine className="w-4 h-4" />
          </HoverBlock>
          <HoverBlock
            tooltip="重做"
            disabled={!hasFuture()}
            onClick={(e) => {
              e.stopPropagation();
              redo();
            }}
          >
            <RiArrowGoForwardLine className="w-4 h-4" />
          </HoverBlock>

          <Divider type="vertical" className="mx-1" />
          <HoverBlock
            selected={controlMode === ControlMode.Pointer}
            tooltip="指针模式"
            onClick={(e) => {
              e.stopPropagation();
              setControlMode(ControlMode.Pointer);
            }}
          >
            <RiCursorLine className="w-4 h-4" />
          </HoverBlock>
          <HoverBlock
            selected={controlMode === ControlMode.Hand}
            tooltip="手模式"
            onClick={(e) => {
              e.stopPropagation();
              setControlMode(ControlMode.Hand);
            }}
          >
            <RiHand className="w-4 h-4" />
          </HoverBlock>
          <Divider type="vertical" className="mx-1" />
          <HoverBlock
            tooltip="折叠节点"
            onClick={(e) => {
              e.stopPropagation();
              setNodesFolded(true);
            }}
          >
            <RiContractUpDownLine className="w-4 h-4" />
          </HoverBlock>
          <HoverBlock
            tooltip="展开节点"
            onClick={(e) => {
              e.stopPropagation();
              setNodesFolded(false);
            }}
          >
            <RiExpandUpDownLine className="w-4 h-4" />
          </HoverBlock>
          <Divider type="vertical" className="mx-1" />
          <HoverBlock
            tooltip="自动布局"
            onClick={(e) => {
              e.stopPropagation();
              autoLayout();
              takeSnapshot();
            }}
          >
            <RiColorFilterLine className="w-4 h-4" />
          </HoverBlock>
        </div>
      </div>
    </div>
  );
};

export const Operator = memo(OperatorRaw);
