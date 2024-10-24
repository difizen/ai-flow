import { VariableForm } from '@/components/VariableForm/index';
import type { NodeType } from '@/interfaces/flow';

import React from 'react';
import { NodeWrapper } from '../NodeWrapper/index';

const StartNode = (props: NodeType) => {
  const { data } = props;

  return (
    <NodeWrapper nodeProps={props} leftHandler={false}>
      <VariableForm
        label="输入"
        showRequired={false}
        dynamic={false}
        values={data.config?.outputs || []}
        onChange={(values) => {}}
      />
    </NodeWrapper>
  );
};

export default StartNode;
