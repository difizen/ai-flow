import { CollapseWrapper } from '@/components/AIBasic/index';
import { OutputVariable } from '@/components/AIBasic/OutputVariableTree/OutputVariable/index';
import { ReferenceForm } from '@/components/ReferenceForm/index';
import type { BasicSchema, NodeType } from '@/interfaces/flow';
import { useFlowStore } from '@/stores/flowStore';
import { useKnowledgeStore } from '@/stores/useKnowledgeStore';

import { NodeWrapper } from '../NodeWrapper/index';

const KnowledgeNode = (props: NodeType) => {
  const { data } = props;
  // const { config } = data;

  const setNode = useFlowStore((state) => state.setNode);
  const nodeLinkMap = useFlowStore((state) => state.nodeLinkMap);
  const { KnowledgeSelector } = useKnowledgeStore();

  const upstreamNodes = nodeLinkMap[data.id];

  const knowledge_param = data.config?.inputs?.[
    'knowledge_param'
  ] as BasicSchema[];

  return (
    <NodeWrapper nodeProps={props}>
      <div>
        <ReferenceForm
          label="输入变量"
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
        <CollapseWrapper className="mt-3" label={'知识库配置'}>
          {' '}
          <>
            {KnowledgeSelector !== null ? (
              <KnowledgeSelector
                nodeId={data.id}
                knowledgeParam={knowledge_param}
              />
            ) : (
              <>知识库配置</>
            )}
          </>
        </CollapseWrapper>

        <CollapseWrapper className="mt-3" label={'Output'}>
          <>
            {(data.config?.outputs || []).map((output) => (
              <OutputVariable
                key={output.name!}
                name={output.name!}
                type={output.type}
              />
            ))}
          </>
        </CollapseWrapper>
      </div>
    </NodeWrapper>
  );
};

export default KnowledgeNode;
