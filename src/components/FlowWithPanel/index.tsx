import React from 'react';
import Flow from '../Flow';
import {
  EndNodeDefaultConfig,
  KnowledgeNodeDefaultConfig,
  LLMNodeDefaultConfig,
  StartNodeDefaultConfig,
} from '../Node/schemas';
import { NodesPanel } from '../NodePanel';

export const FlowWithPanel = () => {
  return (
    <div className="flex">
      <NodesPanel
        className="w-[200px]"
        nodes={[
          StartNodeDefaultConfig,
          EndNodeDefaultConfig,
          LLMNodeDefaultConfig,
          KnowledgeNodeDefaultConfig,
        ]}
      />
      <Flow classNames="flex-1" />
    </div>
  );
};
