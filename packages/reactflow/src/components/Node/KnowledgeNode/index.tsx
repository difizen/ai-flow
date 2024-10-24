import { NodeType } from '@/interfaces/flow';
import React from 'react';
import { NodeWrapper } from '../NodeWrapper';

const KnowledgeNode = (props: NodeType) => {
  return <NodeWrapper nodeProps={props}></NodeWrapper>;
};

export default KnowledgeNode;
