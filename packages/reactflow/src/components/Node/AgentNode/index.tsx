import type { NodeType } from '@/interfaces/flow';

import { NodeWrapper } from '../NodeWrapper/index';
import React from 'react';

const AgentNode = (props: NodeType) => {
  return <NodeWrapper nodeProps={props}></NodeWrapper>;
};
export default AgentNode;
