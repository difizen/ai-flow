import type { ConnectionLineComponentProps } from '@xyflow/react';
import { Position, getBezierPath } from '@xyflow/react';
import React, { memo } from 'react';
import { EdgeColor } from './index';

const CustomConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: Position.Right,
    targetX: toX,
    targetY: toY,
    targetPosition: Position.Left,
    curvature: 0.16,
  });

  return (
    <g>
      <path
        fill="none"
        stroke={EdgeColor.Default}
        strokeWidth={2.5}
        d={edgePath}
      />
    </g>
  );
};

export default memo(CustomConnectionLine);
