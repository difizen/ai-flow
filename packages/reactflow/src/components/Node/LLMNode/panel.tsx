import { CollapseWrapper, SelectInNode } from '@/components/AIBasic/index';
import { OutputVariable } from '@/components/AIBasic/OutputVariableTree/OutputVariable/index';
import { PromptEditor } from '@/components/AIBasic/PromptEditor/index';
import { ReferenceForm } from '@/components/ReferenceForm/index';
import type { BasicSchema, NodeDataType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import { useModelStore } from '@/stores/useModelStore';
import { BarsOutlined } from '@ant-design/icons';
import { Button, InputNumber, Popover } from 'antd';
import React, { memo, useMemo } from 'react';

const Prompt = (props: {
  value: string;
  onChange: (value: string) => void;
  variables: any[] | undefined;
  className?: string;
}) => {
  const { value, onChange, className, variables } = props;
  return (
    <CollapseWrapper className={className} label={'Prompt'}>
      <div className="h-[200px] bg-white rounded-md cursor-pointer nodrag p-3 overflow-y-auto">
        <PromptEditor
          value={value}
          placeholder="请输入 Prompt"
          onChange={onChange}
          variableBlock={{
            show: true,
            variables,
          }}
        />
      </div>
    </CollapseWrapper>
  );
};

const PromptMemo = memo(Prompt, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.variables === nextProps.variables
  );
});

export const LLMPanel = (props: { data: NodeDataType }) => {
  const { data } = props;

  const setNode = useFlowStore((state) => state.setNode);
  const nodeLinkMap = useFlowStore((state) => state.nodeLinkMap);

  const { ModelSelector, modelOptions, modelConfig } = useModelStore();
  const upstreamNodes = nodeLinkMap[data.id];

  const llmParam = data.config?.inputs?.['llm_param'] as BasicSchema[];

  const variable = useMemo(
    () =>
      data.config?.inputs?.input_param.map((input) => {
        return {
          name: input.name,
          value: input.name,
        };
      }),
    [data.config?.inputs?.input_param],
  );
  return (
    <div>
      {/* Part1 model selector & model config */}
      <CollapseWrapper className="mb-4" label={'模型配置'}>
        <>
          {ModelSelector !== null ? (
            <ModelSelector nodeId={data.id} llmParam={llmParam} />
          ) : (
            <div className="flex">
              <SelectInNode
                options={modelOptions.map((model) => ({
                  label: model.name,
                  value: model.id,
                }))}
                className="w-full mr-2"
              />
              <Popover
                title="模型配置"
                content={
                  <div>
                    {Object.entries(modelConfig).map(([key, value]) => (
                      <div key={key}>
                        <InputNumber key={value} />
                      </div>
                    ))}
                  </div>
                }
              >
                {Object.entries(modelConfig).length > 0 && (
                  <Button type="text" icon={<BarsOutlined />}></Button>
                )}
              </Popover>
            </div>
          )}
        </>
      </CollapseWrapper>

      {/* Part2 Ref Form */}
      {
        <ReferenceForm
          label="输入变量"
          dynamic
          nodes={upstreamNodes}
          value={data.config?.inputs?.input_param}
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
      }
      {/* Part3 PromptEditor */}
      <PromptMemo
        value={
          (llmParam.find((item) => item.name === 'prompt')?.value
            ?.content as string) || ''
        }
        onChange={(values) => {
          setNode(data.id, (old) => ({
            ...old,
            data: {
              ...old.data,
              config: {
                ...(old.data['config'] as Record<string, any>),
                inputs: {
                  ...(old.data['config'] as Record<string, any>)['inputs'],
                  llm_param: [
                    ...llmParam.filter((p) => p.name !== 'prompt'),
                    {
                      name: 'prompt',
                      type: 'string',
                      value: {
                        type: 'value',
                        content: values,
                      },
                    },
                  ],
                },
              },
            },
          }));
        }}
        variables={variable}
      />
      {/* Part4 Outputer */}
      <CollapseWrapper className="mt-3" label={'Output'}>
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
