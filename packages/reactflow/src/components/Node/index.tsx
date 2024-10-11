import type { NodeProps } from '@xyflow/react';
import type { FC, ReactElement } from 'react';
import { memo, type ComponentType } from 'react';

import EndNode from './EndNode/index';
import IfElseNode from './IfElseNode/index';
import KnowledgeNode from './KnowledgeNode/index';
import LLMNode from './LLMNode/index';
import { NodeWrapper } from './NodeWrapper/index';
import StartNode from './StartNode/index';

export { default as AgentNode } from './AgentNode/index';
export { default as EndNode } from './EndNode/index';
export { default as IfElseNode } from './IfElseNode/index';
export { default as KnowledgeNode } from './KnowledgeNode/index';
export { default as LLMNode } from './LLMNode/index';
export { NodeWrapper } from './NodeWrapper/index';
export { default as StartNode } from './StartNode/index';

export enum BlockEnum {
  Start = 'start',
  End = 'end',
  LLM = 'llm',
  Knowledge = 'knowledge',
  IfElse = 'ifelse',
  Tool = 'tool',
  // Answer = 'answer',
  // QuestionClassifier = 'question-classifier',
  // Code = 'code',
  // TemplateTransform = 'template-transform',
  // HttpRequest = 'http-request',
  // VariableAssigner = 'variable-assigner',
  // VariableAggregator = 'variable-aggregator',
  // ParameterExtractor = 'parameter-extractor',
  // Iteration = 'iteration',
  // IterationStart = 'iteration-start',
  // Assigner = 'assigner', // is now named as VariableAssigner
}

export const NodeComponentMap: Record<string, ComponentType<any>> = {
  [BlockEnum.Start]: StartNode,
  [BlockEnum.End]: EndNode,
  [BlockEnum.LLM]: LLMNode,
  [BlockEnum.Knowledge]: KnowledgeNode,
  [BlockEnum.IfElse]: IfElseNode,
};

type BaseNodeProps = {
  children: ReactElement;
  nodeProps: NodeProps;
};

const BaseNode: FC<BaseNodeProps> = ({ nodeProps, children }) => {
  return <NodeWrapper nodeProps={nodeProps}>{children}</NodeWrapper>;
};

const CustomNodeRaw = (props: NodeProps) => {
  const nodeData = props.data;
  const NodeComponent = NodeComponentMap[nodeData['type'] as BlockEnum];

  return (
    <>
      <BaseNode nodeProps={props}>
        <NodeComponent />
      </BaseNode>
    </>
  );
};

export const CustomNode = memo(CustomNodeRaw);
