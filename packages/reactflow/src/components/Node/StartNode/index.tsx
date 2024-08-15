import { VariableForm } from '@/components/VariableForm';
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

export const StartNode = (props: Props) => {
  const { data } = props;
  console.log('🚀 ~ StartNode ~ data:', data);
  const { config } = data;

  return (
    <NodeWrapper nodeProps={props} leftHandler={false}>
      <Collapse>
        {/* <SchemaConfigForm formSchema={mockSchema} /> */}

        <VariableForm
          label="输入"
          values={config?.outputs || []}
          onChange={(values) => {
            console.log('qianyan', values);
          }}
        />
      </Collapse>
    </NodeWrapper>
  );
};
