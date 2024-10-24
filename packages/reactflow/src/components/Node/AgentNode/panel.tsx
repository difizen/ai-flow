import { CollapseWrapper } from '@/components/AIBasic/index';
import { OutputVariable } from '@/components/AIBasic/OutputVariableTree/OutputVariable/index';
import { ReferenceForm } from '@/components/ReferenceForm/index';
import type { NodeType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import React from 'react';

export const AgentPanel = (props: NodeType) => {
  const { data } = props;
  const nodeLinkMap = useFlowStore((state) => state.nodeLinkMap);
  const setNode = useFlowStore((state) => state.setNode);
  const upstreamNodes = nodeLinkMap[data.id];

  return (
    <div>
      <ReferenceForm
        label="输入变量"
        nodes={upstreamNodes}
        value={[...(data.config?.inputs?.input_param || [])]}
        onChange={(values) => {
          setNode(data.id, (old) => ({
            ...old,
            data: {
              ...old.data,
              config: {
                ...(old.data['config'] as Record<string, any>),
                inputs: {
                  ...(old.data['config'] as Record<string, any>)['inputs'],
                  input_param: [...values],
                },
              },
            },
          }));
        }}
      />
      {/* <CollapseWrapper
          className="mt-3"
          label={'Prompt'}
          content={
            <div className="h-[200px] bg-white rounded-md cursor-pointer overflow-auto">
              <PromptEditor
                value={
                  ((data.config?.inputs?.prompt as BasicSchema)?.value
                    ?.content as string) || ''
                }
                placeholder="请输入 Prompt"
                onChange={(values) => {
                  setNode(data.id, (old) => ({
                    ...old,
                    data: {
                      ...old.data,
                      config: {
                        ...(old.data.config as Record<string, any>),
                        inputs: {
                          ...old.data.config.inputs,
                          prompt: {
                            ...old.data.config.inputs.prompt,
                            value: values,
                          },
                        },
                      },
                    },
                  }));
                }}
                variableBlock={{
                  show: true,
                  variables: data.config?.inputs?.input_param.map((input) => {
                    return {
                      name: input.name,
                      value: input.name,
                    };
                  }),
                }}
              />
            </div>
          }
        /> */}
      <CollapseWrapper className="mt-3" label={'Output2'}>
        <>
          {(data.config?.outputs || []).map((output) => (
            <OutputVariable
              key={output.name}
              name={output.name}
              type={output.type}
            />
          ))}
        </>
      </CollapseWrapper>
    </div>
  );
};
