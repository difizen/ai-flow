import classNames from '@/utils/classnames';
import React from 'react';

export const PanelWrapper = (props: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { className, children } = props;
  return (
    <div
      className={classNames(
        'w-[384px] mr-2 h-full bg-white z-0 shadow-lg rounded-2xl overflow-y-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};
