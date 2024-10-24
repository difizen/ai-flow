import classNames from '@/utils/classnames';
import React from 'react';

export const ToolbarWrapper = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;
  return <div className={classNames(className)}>{children}</div>;
};
