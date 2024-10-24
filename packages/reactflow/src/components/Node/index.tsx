import { type ComponentType } from 'react';

import EndNode from './EndNode/index';
import { EndPanel } from './EndNode/panel';
import IfElseNode from './IfElseNode/index';
import KnowledgeNode from './KnowledgeNode/index';
import { KnowledgePanel } from './KnowledgeNode/panel';
import LLMNode from './LLMNode/index';
import { LLMPanel } from './LLMNode/panel';
import { AgentPanel } from './AgentNode/panel';
import StartNode from './StartNode/index';
import AgentNode from './AgentNode/index';

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
  Agent = 'agent',
  Workflow = 'workflow',
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
  [BlockEnum.Agent]: AgentNode,
};

export const PanelComponentMap: Record<string, ComponentType<any>> = {
  [BlockEnum.LLM]: LLMPanel,
  [BlockEnum.End]: EndPanel,
  [BlockEnum.Knowledge]: KnowledgePanel,
  [BlockEnum.Agent]: AgentPanel,
};
