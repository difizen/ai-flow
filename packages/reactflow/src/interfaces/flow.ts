import type { Node, ReactFlowJsonObject } from '@xyflow/react';

export type NodeTypes =
  | 'start'
  | 'end'
  | 'llm'
  | 'knowledge'
  | 'agent'
  | 'tool'
  | 'ifelse';

// export enum NodeTypeEnum {
//   'Start' = 'start',
//   'End' = 'end',
//   'LLM' = 'llm',
//   'Knowledge' = 'knowledge',
//   'Agent' = 'agent',

//   // 'Plugin' = 'plugin',
//   'Tool' = 'tool',
//   'IfElse' = 'ifelse',
// }

export enum IfElseNodeCompareType {
  Equal = 'equal',
  NotEqual = 'notequal',
  Blank = 'blank',
}

export interface LiteralValueType {
  type: 'value';
  content?: string | number | boolean | string[] | number[] | boolean[];
}

export interface RefValueType {
  type: 'reference';
  content?: {
    source: string;
    blockID: string;
    name: string;
  };
}

export type ValueType = 'reference' | 'value';
export interface ReferenceSchema {
  type: 'reference';
  content?: [string, string];
}

export interface ValueSchema {
  type: 'value';
  content?: string;
}

export type SchemaValueType = ReferenceSchema | ValueSchema;

export interface BasicSchema {
  type: string;
  name: string;
  value?: SchemaValueType;
  required?: boolean;
  // BasicSchema 对应 type = list，BasicSchema[] 对应 type = object
  schema?: BasicSchema | BasicSchema[];
  description?: string;
}

export interface NodeDataConfigType {
  inputs?: {
    input_param: BasicSchema[];
    branches?: ConditionBranch[];
    [key: string]: BasicSchema[] | BasicSchema | ConditionBranch[] | undefined;
  };
  outputs?: BasicSchema[];
}

export interface NodeDataMetaType {
  name: string;
  icon?: string;
  description?: string;
}

export interface NodeDataType extends Record<string, unknown> {
  id: string;
  type: NodeTypes;
  runResult?: {
    status: string;
    result?: any;
  };
  name?: string;
  icon?: string;
  description?: string;
  config?: NodeDataConfigType;
  folded?: boolean;
  edited?: boolean;
}

export type NodeType = Node<NodeDataType>;

export type FlowType = {
  id: string;
  name: string;
  icon?: string;
  description: string;
  data: ReactFlowJsonObject | null;
  updated_at?: string;
  date_created?: string;
  user_id?: string;
};

// right side
export type sourceHandleType = {
  dataType: string;
  id: string;
  output_types: string[];
  conditionalPath?: string | null;
  name: string;
};

//left side
export type targetHandleType = {
  inputTypes?: string[];
  type: string;
  fieldName: string;
  id: string;
  proxy?: { field: string; id: string };
};

export type CompareOperator = 'equal' | 'notequal' | 'blank';
export type LogicOperator = 'and' | 'or';

export interface ConditionBranch {
  name: string;
  logic?: LogicOperator;
  conditions: {
    compare: CompareOperator;
    left: {
      type: string;
      content: SchemaValueType;
    };
    right: {
      type: string;
      content: SchemaValueType;
    };
  }[];
}

export enum NodePanelTypeEnum {
  InNode = 'innode',
  Panel = 'panel',
}

export type NodePanelType = NodePanelTypeEnum.InNode | NodePanelTypeEnum.Panel;

export enum ControlMode {
  Pointer = 'pointer',
  Hand = 'hand',
}

export enum FlowHistoryType {
  NodeAdd = 'NodeAdd',
  NodeDrag = 'NodeDrag',
  NodeChange = 'NodeChange',
  NodeConnect = 'NodeConnect',
  NodePaste = 'NodePaste',
  NodeDelete = 'NodeDelete',

  EdgeDelete = 'EdgeDelete',
  NodeResize = 'NodeResize',
}
