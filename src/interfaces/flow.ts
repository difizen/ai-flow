import { ReactFlowJsonObject, XYPosition } from '@xyflow/react';

export enum NodeTypeEnum {
  'LLM' = 'llm',
  'Knowledge' = 'knowledge',
  'Plugin' = 'plugin',
  'Start' = 'start',
  'End' = 'end',
  'Code' = 'code',
}
export interface LiteralValueType {
  type: 'literal';
  content?: string | number | boolean | string[] | number[] | boolean[];
}

export interface RefValueType {
  type: 'ref';
  content?: {
    source: string;
    blockID: string;
    name: string;
  };
}

export interface BasicSchema {
  type: string;
  name?: string;
  value?: LiteralValueType | RefValueType;
  required?: boolean;
  // BasicSchema 对应 type = list，BasicSchema[] 对应 type = object
  schema?: BasicSchema | BasicSchema[];
  description?: string;
}

export interface InputSchema {
  name: string;
  input: BasicSchema;
}

export interface NodeDataConfigType {
  params?: InputSchema[];
  inputs?: InputSchema[];
  outputs?: BasicSchema[];
}

export interface NodeDataMetaType {
  title: string;
  icon?: string;
  description?: string;
}

export interface NodeDataType {
  id: string;
  type: NodeTypeEnum;
  runResult?: {
    status: string;
    result?: any;
  };
  nodeMeta: NodeDataMetaType;
  config?: NodeDataConfigType;
}

export interface NodeType {
  id: string;
  position: XYPosition;
  type: string;
  data: NodeDataType;
  selected?: boolean;
}

export type FlowType = {
  id: string;
  name: string;
  icon?: string;
  description: string;
  data: ReactFlowJsonObject | null;
  //
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
