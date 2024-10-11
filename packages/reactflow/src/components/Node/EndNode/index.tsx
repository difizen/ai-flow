import { CollapseWrapper } from '@/components/AIBasic/CollapseWrapper/index';
import { PromptEditor } from '@/components/AIBasic/PromptEditor/index';
import { ReferenceForm } from '@/components/ReferenceForm/index';
import type { BasicSchema, NodeType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import { memo, useMemo } from 'react';

import { NodeWrapper } from '../NodeWrapper/index';

const EndNode = (props: NodeType) => {
  const { data } = props;
  const nodeLinkMap = useFlowStore((state) => state.nodeLinkMap);
  const setNode = useFlowStore((state) => state.setNode);
  const upstreamNodes = useMemo(
    () => nodeLinkMap[data.id],
    [nodeLinkMap, data.id],
  );

  return (
    <NodeWrapper nodeProps={props} rightHandler={false}>
      <ReferenceForm
        label="输入变量"
        dynamic={true}
        nodes={upstreamNodes}
        value={data.config?.inputs?.input_param || []}
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

      <CollapseWrapper className="mt-3" label={'Output'}>
        {' '}
        <>
          <div className="h-[200px] bg-white rounded-md cursor-pointer overflow-auto">
            <PromptEditor
              value={
                ((data.config?.inputs?.['prompt'] as BasicSchema).value
                  ?.content as string) || ''
              }
              placeholder="请输入 Prompt"
              onChange={(values) => {
                setNode(data.id, (old) => ({
                  ...old,
                  data: {
                    ...old.data,
                    config: {
                      ...(old.data['config'] as Record<string, any>),
                      inputs: {
                        ...(old.data['config'] as Record<string, any>)[
                          'inputs'
                        ],
                        prompt: {
                          ...(old.data['config'] as Record<string, any>)[
                            'inputs'
                          ].prompt,
                          value: {
                            type: 'value',
                            content: values,
                          },
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
                    name: input.name!,
                    value: input.name!,
                  };
                }),
              }}
            />
          </div>
        </>
      </CollapseWrapper>
    </NodeWrapper>
  );
};

export default memo(EndNode);
