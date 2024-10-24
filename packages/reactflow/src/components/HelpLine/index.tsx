import {
  HelpLineHorizontalPosition,
  HelpLineVerticalPosition,
  useHelpLine,
} from '@/stores/helpLine';
import { useViewport } from '@xyflow/react';
import React, { memo } from 'react';

const HelpLineHorizontal = memo(
  ({ top, left, width }: HelpLineHorizontalPosition) => {
    const { x, y, zoom } = useViewport();

    return (
      <div
        className="absolute z-[9] border-blue-400 border-dashed border-t-2"
        style={{
          top: top * zoom + y,
          left: left * zoom + x,
          width: width * zoom,
        }}
      />
    );
  }
);

const HelpLineVertical = memo(
  ({ top, left, height }: HelpLineVerticalPosition) => {
    const { x, y, zoom } = useViewport();

    return (
      <div
        className="absolute z-[9] border-blue-400 border-dashed border-l-2"
        style={{
          top: top * zoom + y,
          left: left * zoom + x,
          height: height * zoom,
        }}
      />
    );
  }
);

const HelpLine = () => {
  const helpLineHorizontal = useHelpLine((s) => s.helpLineHorizontal);
  const helpLineVertical = useHelpLine((s) => s.helpLineVertical);

  if (!helpLineHorizontal && !helpLineVertical) return null;

  return (
    <>
      {helpLineHorizontal && <HelpLineHorizontal {...helpLineHorizontal} />}
      {helpLineVertical && <HelpLineVertical {...helpLineVertical} />}
    </>
  );
};

export default memo(HelpLine);
