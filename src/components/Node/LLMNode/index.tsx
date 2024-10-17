import { type NodeType } from '@/interfaces/flow';
import { memo } from 'react';

import React from 'react';
import { NodeWrapper } from '../NodeWrapper/index';

const LLMNode = (props: NodeType) => {
  return <NodeWrapper nodeProps={props}></NodeWrapper>;
};

export default memo(LLMNode);
