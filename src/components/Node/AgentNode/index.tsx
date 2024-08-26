import { CollapseWrapper } from '@/components/AIBasic/CollapseWrapper';
import { OutputString } from '@/components/AIBasic/OutputVariableTree/OutputString';
import { RefrenceForm } from '@/components/ReferenceForm';
import { NodeDataType, NodeTypeEnum } from '@/interfaces/flow';
import React from 'react';
import { NodeWrapper } from '../NodeWrapper';

type Props = {
  data: NodeDataType;
  selected: boolean;
  xPos: number;
  yPos: number;
};

export const AgentNode = (props: Props) => {
  // const { data } = props;
  // const { config } = data;

  return (
    <NodeWrapper nodeProps={props}>
      <div>
        <RefrenceForm
          label="输入变量"
          nodes={[
            {
              id: 'node-1',
              type: 'start',
              data: {
                id: 'node-1',
                type: NodeTypeEnum.LLM,
                name: '开始',
                icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start.png',
                description: '工作流的起始节点，用于设定启动工作流需要的信息',
                config: {
                  outputs: [
                    {
                      type: 'string',
                      name: 'BOT_USER_INPUT',
                      required: false,
                      description: '用户本轮对话输入内容',
                    },
                  ],
                },
              },
              position: { x: 250, y: 50 },
            },
          ]}
          values={[{ name: 'input', type: 'ref' }]}
          onChange={(values) => {
            console.log('RefrenceForm', values);
          }}
        />

        <CollapseWrapper
          className="mt-3"
          label={'Output'}
          content={<OutputString />}
        />
      </div>
    </NodeWrapper>
  );
};
