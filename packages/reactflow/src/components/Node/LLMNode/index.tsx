import { CollapseWrapper } from '@/components/AIBasic/CollapseWrapper';
import { OutputString } from '@/components/AIBasic/OutputVariableTree/OutputString';
import PromptEditor from '@/components/AIBasic/PromptEditor';
import { SelectInNode } from '@/components/AIBasic/SelectInNode';
import { ReferenceForm } from '@/components/ReferenceForm';
import { NodeDataType, NodeTypeEnum } from '@/interfaces/flow';
import React, { useState } from 'react';
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

  const [value, setValue] = useState<string>('hello');
  return (
    <NodeWrapper nodeProps={props}>
      <div className="nodrag">
        {/* Part1 model selector & model config */}
        <CollapseWrapper
          className="mb-3"
          label={'模型配置'}
          content={
            <SelectInNode
              options={[{ label: 'model-config', value: 'model-config' }]}
              className="w-full"
            />
          }
        />
        {/* Part2 Ref Form */}

        <ReferenceForm
          label="输入变量"
          dynamic
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
          values={[
            {
              name: 'output',
              type: 'string',
              value: {
                type: 'reference',
              },
            },
          ]}
          onChange={(values) => {
            console.log('ReferenceForm', values);
          }}
        />
        {/* Part3 PromptEditor */}
        <CollapseWrapper
          className="mt-3"
          label={'Prompt'}
          content={
            <div className="h-[200px] bg-white rounded-md cursor-pointer">
              <PromptEditor
                value={value}
                onChange={(val) => setValue(val)}
                variableBlock={{ show: true }}
              />
            </div>
          }
        />
        {/* Part4 Outputer */}
        <CollapseWrapper
          className="mt-3"
          label={'Output'}
          content={<OutputString />}
        />
      </div>
    </NodeWrapper>
  );
};
