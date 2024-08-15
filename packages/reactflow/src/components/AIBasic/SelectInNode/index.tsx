import { classNames } from '@/utils';
import { Select, SelectProps } from 'antd';
import React from 'react';

interface innerSelectProps extends SelectProps {
  selectorId: string;
}
export const SelectInNode = (props: innerSelectProps) => {
  return (
    <div id={props.selectorId}>
      <Select
        {...props}
        className={classNames(props.className || '', 'nodrag')}
        getPopupContainer={() =>
          document.getElementById(props.selectorId) || document.body
        }
      ></Select>
    </div>
  );
};
