import { classNames } from '@/utils';
import { Cascader, CascaderProps } from 'antd';
import React from 'react';

interface innerCascaderProps extends CascaderProps {
  selectorId: string;
}

export const CascaderInNode = (props: innerCascaderProps) => {
  return (
    <div id={props.selectorId}>
      <Cascader
        {...props}
        multiple={props.multiple as any}
        className={classNames(props.className || '', 'nodrag')}
        getPopupContainer={() =>
          document.getElementById(props.selectorId) || document.body
        }
      ></Cascader>
    </div>
  );
};
