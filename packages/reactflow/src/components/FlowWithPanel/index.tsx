import { EventEmitterContextProvider } from '@/context/event-emitter';
import { NodeDataType, NodeTypeEnum } from '@/interfaces/flow';
import yaml from 'js-yaml';
import React from 'react';
import Flow from '../Flow';
import { AgentNode } from '../Node/AgentNode';
import { EndNode } from '../Node/EndNode';
import { IfElseNode } from '../Node/IfElseNode';
import { KnowledgeNode } from '../Node/KnowledgeNode';
import { LLMNode } from '../Node/LLMNode';
import { StartNode } from '../Node/StartNode';
import { NodesPanel } from '../NodePanel';

const yamlContent = `
- id: 1
  name: 开始节点
  description: 工作流的起始节点，用于设定启动工作流需要的信息
  type: start
  position:
    x: 100
    y: 100
  data:
    outputs:
      - name: user_input
        type: string
        description: 用户本轮对话输入内容
- id: 2
  position:
    x: 200
    y: 100
  name: 结束节点
  description: 工作流的最终节点，用于返回工作流运行后的结果信息
  type: end
  data:
    inputs:
      input_param:
        - name: response
          type: string
          value:
            type: reference
            content: ['llm1', 'output'] # 通过nodeId + paramKey 定位引用变量
      prompt:
        name: response
        type: string
        description: 输出内容
        value: '{{response}}'
- id: 3
  name: 大模型节点
  description: 调用大语言模型,使用变量和提示词生成回复
  type: llm
  position:
    x: 300
    y: 100
  data:
    inputs:
      input_param:
        - name: input
          description:
          type: string
          value:
            type: reference
        - name: background
          description:
          type: string
          value:
            type: reference
      llm_param:
        - type: string
          name: id
          value: qwen_llm
        - type: string
          name: model_name
          value: qwen-max
        - type: string
          name: temperature
          value: '0.7'
        - type: string
          name: prompt
          value: |
            你是一位精通信息分析的ai助手。你的目标是使用中文结合查询的背景信息及你所拥有的知识回答用户提出的问题。
            你需要遵守的规则是:
            1. 必须使用中文结合查询的背景信息结合你所拥有的知识回答用户提出的问题。
            2. 结构化答案生成，必要时通过空行提升阅读体验。
            3. 不采用背景信息中的错误信息。
            4. 要考虑答案和问题的相关性，不做对问题没有帮助的回答。
            5. 详尽回答问题，重点突出，不过多花哨词藻。
            6. 不说模糊的推测。
            7. 尽量多的使用数值类信息。

            背景信息是:
            {background}

            开始!
            需要回答的问题是: {input}
    outputs:
      - type: string
        name: output
- id: 4
  name: 知识库示例
  description:
  type: knowledge
  position:
    x: 400
    y: 100
  data:
    inputs:
      knowledge_param:
        - type: string
          name: id
          value: demo_knowledge
        - type: string
          name: top_k
          value:
            type: value
            content: '2'
      input_param:
        - type: string
          name: query # 自然语言的知识库query
          value:
            type: reference
    outputs:
      - name: output
        type: string
- id: 5
  name: 谷歌搜索工具
  description:
  type: tool
  position:
    x: 500
    y: 100
  data:
    inputs:
      tool_param:
        - type: string
          name: id
          value: google_search
      input_param:
        - type: string
          name: input
          value:
            type: value
            content: 'output' # 通过nodeId + paramKey 定位引用变量
    outputs:
      - name: output
        type: string
- id: 6
  name: rag智能体
  description:
  type: agent
  position:
    x: 600
    y: 100
  data:
    inputs:
      agent_param:
        - type: string
          name: id
          value: demo_rag_agent
      input_param:
        - type: string
          name: input
          value:
            type: reference

    outputs:
      - name: output
        type: string
- id: 7
  name: 条件判断
  description:
  type: ifelse
  position:
    x: 700
    y: 100
  data:
    inputs:
      branches: # 这一期这做一层，不包括 and or 还有我理解默认逻辑不展示在这块对吧，只在edge体现
        - name: branch-1
          conditions:
            - compare: equal
              left:
                type: string
                value:
                  type: reference
              right: # blank 没有right
                type: string # 只有 if 和 else，branch-1和branch-default
                value:
                  type: reference


`;

export const NodeSchemaParser = (obj: Record<string, any>) => {
  obj.config = obj.data;
  obj.icon =
    'https://mdn.alipayobjects.com/huamei_xbkogb/afts/img/A*PzmdRpvZz58AAAAAAAAAAAAADqarAQ/original';

  delete obj.data;
};

const nodeTypes = {
  [NodeTypeEnum.Start]: StartNode,
  [NodeTypeEnum.End]: EndNode,
  [NodeTypeEnum.LLM]: LLMNode,
  [NodeTypeEnum.Knowledge]: KnowledgeNode,
  [NodeTypeEnum.IfElse]: IfElseNode,
  [NodeTypeEnum.Tool]: IfElseNode,
  [NodeTypeEnum.Agent]: AgentNode,
};

export const FlowWithPanel = () => {
  const yaml_data = yaml.load(yamlContent);
  (yaml_data as Record<string, any>[]).forEach((item) => {
    NodeSchemaParser(item);
  });

  // const setNodes = useFlowStore((state) => state.setNodes);
  // const reactFlowInstance = useFlowStore((state) => state.reactFlowInstance);

  // useEffect(() => {
  //   const add = (yaml_data as any).map((node: any) => {
  //     return {
  //       id: node.id,
  //       type: node.type,
  //       position: node.position,
  //       data: node,
  //     };
  //   });

  //   setNodes(add);
  // }, [reactFlowInstance]);

  return (
    <EventEmitterContextProvider>
      <div className="flex">
        <NodesPanel className="w-[200px]" nodes={yaml_data as NodeDataType[]} />
        <Flow classNames="flex-1" nodeTypes={nodeTypes} />
      </div>
    </EventEmitterContextProvider>
  );
};
