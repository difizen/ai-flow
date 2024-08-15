import { NodeDataType } from '@/interfaces/flow';
import { Collapse } from 'antd';
import React from 'react';
import { NodeWrapper } from '../NodeWrapper';

type Props = {
  data: NodeDataType;
  selected: boolean;
  xPos: number;
  yPos: number;
};

export const KnowledgeNode = (props: Props) => {
  // const { data } = props;
  // const { config } = data;

  return (
    <NodeWrapper nodeProps={props}>
      <Collapse>
        {/* <SchemaConfigForm formSchema={mockSchema} /> */}
        <div>KnowledgeNode</div>
      </Collapse>
    </NodeWrapper>
  );
};
