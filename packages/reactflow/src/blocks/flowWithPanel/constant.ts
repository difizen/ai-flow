import agentIcon from './icons/agent.svg';
import endIcon from './icons/end.svg';
import ifelseIcon from './icons/ifelse.svg';
import knowledgeIcon from './icons/knowledge.svg';
import llmIcon from './icons/llm.svg';
import startIcon from './icons/start.svg';
import toolIcon from './icons/tool.svg';

export const iconMap = {
  start: startIcon,
  end: endIcon,
  llm: llmIcon,
  knowledge: knowledgeIcon,
  tool: toolIcon,
  agent: agentIcon,
  ifelse: ifelseIcon,
};

export const templateNodeYaml = `
- id: 1
  name: 开始节点
  description: 工作流的起始节点，用于设定启动工作流需要的信息
  type: start
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
      prompt:
        name: response
        type: string
        description: 输出内容
        value:
          type: reference
          content: '{{response}}'
    outputs:
      - name: output
        type: string
- id: 3
  name: 大模型节点
  description: 调用大语言模型,使用变量和提示词生成回复
  type: llm
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
          value:
            type: value
            content: qwen_llm
        - type: string
          name: model_name
          value:
            content: qwen-max
            type: value
        - type: string
          name: temperature
          value:
            content: '0.7'
            type: value
        - type: string
          name: prompt
          value:
            type: value
            content: |
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
              {{background}}

              开始!
              需要回答的问题是: {{input}}
    outputs:
      - type: string
        name: output
- id: 4
  name: 知识库
  description:
  type: knowledge
  data:
    inputs:
      knowledge_param:
        - type: string
          name: id
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
  name: 工具
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
      input_param:
        - type: string
          name: input
          value:
            type: value
            content: 'output'
    outputs:
      - name: output
        type: string
- id: 6
  name: 智能体
  description:
  type: agent
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
  data:
    inputs:
      branches:
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
