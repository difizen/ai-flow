import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import React, { ReactNode } from 'react';

export const CollapseWrapper = ({
  className,
  label,
  content,
}: {
  className?: string;
  label?: string;
  content: ReactNode;
}) => {
  return (
    <Collapse
      className={className}
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      items={[
        {
          key: '1',
          label: label || '',
          children: content,
        },
      ]}
    />
  );
};