import { useFlowsManagerStore } from '@/stores/flowsManagerStore';
import React from 'react';
import { ToolbarWrapper } from '../Toolbar';

export const Header = (props: { toolbar?: React.ReactNode }) => {
  const { toolbar } = props;
  const savedAt = useFlowsManagerStore((state) => state.savedAt);

  return (
    <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full px-3 h-14">
      <div className="flex items-center h-[18px] text-xs text-gray-500">
        {savedAt}
      </div>
      <ToolbarWrapper>{toolbar}</ToolbarWrapper>
    </div>
  );
};
