import { NodeDataType } from '@/interfaces/flow';
import React from 'react';
import { NodeWrapper } from '../NodeWrapper';

type Props = {
  data: NodeDataType;
  selected: boolean;
  xPos: number;
  yPos: number;
};

export const IfElseNode = (props: Props) => {
  // const { data } = props;
  // const { config } = data;

  return (
    <NodeWrapper nodeProps={props}>
      <></>
    </NodeWrapper>
  );
};
