import { NodeDataType, NodeTypeEnum } from '@/interfaces/flow';

export const StartNodeDefaultConfig: NodeDataType = {
  id: '1',
  type: NodeTypeEnum.Start,
  nodeMeta: {
    title: '开始节点',
    icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start.png',
    description: '开始节点description',
  },
  config: {
    outputs: [
      {
        type: 'string',
        name: 'BOT_USER_INPUT',
        required: false,
        description: '用户本轮对话输入内容',
      },
    ],
  },
};

export const EndNodeDefaultConfig: NodeDataType = {
  id: '2',
  type: NodeTypeEnum.End,
  nodeMeta: {
    title: '结束节点',
    icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-End.png',
    description: '结束节点description',
  },
  config: {
    params: [
      {
        name: 'terminatePlan',
        input: {
          type: 'string',
          // options: ['useAnswerContent', 'returnVariables'],
          value: {
            type: 'literal',
            content: 'useAnswerContent',
          },
        },
      },
      {
        name: 'streamingOutput',
        input: {
          type: 'boolean',

          value: {
            type: 'literal',
            content: true,
          },
        },
      },
    ],
    inputs: [
      {
        name: 'response_for_model',
        input: {
          type: 'string',
          value: {
            type: 'ref',
          },
        },
      },
    ],
  },
};

export const LLMNodeDefaultConfig: NodeDataType = {
  id: '3',
  type: NodeTypeEnum.LLM,
  nodeMeta: {
    title: '大模型节点',
    icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-LLM.png',
    description: '大模型节点description',
  },
  config: {
    params: [
      {
        name: 'modleName',
        input: {
          type: 'string',
          value: {
            type: 'literal',
            content: '豆包·Function call模型',
          },
        },
      },
      {
        name: 'modelType',
        input: {
          type: 'integer',
          value: {
            type: 'literal',
            content: '1706077826',
          },
        },
      },
      {
        name: 'prompt',
        input: {
          type: 'string',
          value: {
            type: 'literal',
            content: '',
          },
        },
      },
      {
        name: 'temperature',
        input: {
          type: 'float',
          value: {
            type: 'literal',
            content: '1',
          },
        },
      },
      {
        name: 'generationDiversity',
        input: {
          type: 'string',
          value: {
            type: 'literal',
            content: 'balance',
          },
        },
      },
      {
        name: 'topP',
        input: {
          type: 'float',
          value: {
            type: 'literal',
            content: '0.7',
          },
        },
      },
      {
        name: 'responseFormat',
        input: {
          type: 'integer',
          value: {
            type: 'literal',
            content: '2',
          },
        },
      },
      {
        name: 'maxTokens',
        input: {
          type: 'integer',
          value: {
            type: 'literal',
            content: '1024',
          },
        },
      },
      {
        name: 'enableChatHistory',
        input: {
          type: 'boolean',
          value: {
            type: 'literal',
            content: false,
          },
        },
      },
      {
        name: 'systemPrompt',
        input: {
          type: 'string',
          value: {
            type: 'literal',
            content: '',
          },
        },
      },
    ],
    outputs: [
      {
        type: 'string',
        name: 'output',
      },
    ],
  },
};

export const KnowledgeNodeDefaultConfig: NodeDataType = {
  id: '4',
  type: NodeTypeEnum.Knowledge,
  nodeMeta: {
    title: '知识库节点',
    icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Knowledge.png',
    description: '知识库节点description',
  },
  config: {
    params: [
      {
        name: 'datasetList',
        input: {
          type: 'list',
          schema: {
            type: 'string',
          },
          value: {
            type: 'literal',
            content: [],
          },
        },
      },
      {
        name: 'topK',
        input: {
          type: 'integer',
          value: {
            type: 'literal',
          },
        },
      },
    ],
    outputs: [
      {
        type: 'list',
        name: 'outputList',
        schema: {
          type: 'object',
          schema: [
            {
              type: 'string',
              name: 'output',
            },
          ],
        },
      },
    ],
  },
};
