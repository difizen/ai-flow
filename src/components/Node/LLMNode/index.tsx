import { RefrenceForm } from '@/components/ReferenceForm';
import { NodeDataType, NodeTypeEnum } from '@/interfaces/flow';
import { Collapse } from 'antd';
import React from 'react';
import { NodeWrapper } from '../NodeWrapper';

type Props = {
  data: NodeDataType;
  selected: boolean;
  xPos: number;
  yPos: number;
};

export const LLMNode = (props: Props) => {
  // const { data } = props;
  // console.log('🚀 ~ LLMNode ~ data:', data);
  // const { config } = data;

  return (
    <NodeWrapper nodeProps={props}>
      <div>
        {/* Part1 model selector & model config */}
        {/* Part2 Ref Form */}
        <Collapse>
          <RefrenceForm
            label="输入变量"
            nodes={[
              {
                id: 'node-1',
                type: 'start',
                data: {
                  id: 'node-1',
                  type: NodeTypeEnum.LLM,
                  nodeMeta: {
                    title: '开始',
                    icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start.png',
                    description:
                      '工作流的起始节点，用于设定启动工作流需要的信息',
                  },
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
            values={[{ name: 'output', type: 'ref' }]}
            onChange={(values) => {
              console.log('RefrenceForm', values);
            }}
          />
        </Collapse>

        {/* Part3 PromptEditor */}
        {/* Part4 Outputer */}
      </div>
    </NodeWrapper>
  );
};
