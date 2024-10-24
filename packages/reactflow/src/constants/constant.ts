import { NodeDataType } from '@/interfaces/flow';

export const IS_MAC = navigator.userAgent.toUpperCase().includes('MAC');

export const defaultShortcuts = [
  {
    name: 'Advanced Settings',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Shift + A`,
  },
  {
    name: 'Minimize',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Q`,
  },
  {
    name: 'Code',
    shortcut: `Space`,
  },
  {
    name: 'Copy',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + C`,
  },
  {
    name: 'Duplicate',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + D`,
  },
  {
    name: 'Component Share',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Shift + S`,
  },
  {
    name: 'Docs',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Shift + D`,
  },
  {
    name: 'Save',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + S`,
  },
  {
    name: 'Delete',
    shortcut: 'Backspace',
  },
  {
    name: 'Open playground',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + K`,
  },
  {
    name: 'Undo',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Z`,
  },
  {
    name: 'Redo',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Y`,
  },
  {
    name: 'Group',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + G`,
  },
  {
    name: 'Cut',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + X`,
  },
  {
    name: 'Paste',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + V`,
  },
  {
    name: 'API',
    shortcut: `R`,
  },
  {
    name: 'Download',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + J`,
  },
  {
    name: 'Update',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + U`,
  },
  {
    name: 'Freeze',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + F`,
  },
  {
    name: 'Freeze Path',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + Shift + F`,
  },
  {
    name: 'Flow Share',
    shortcut: `${IS_MAC ? 'Cmd' : 'Ctrl'} + B`,
  },
  {
    name: 'Play',
    shortcut: `P`,
  },
  {
    name: 'Output Inspection',
    shortcut: `O`,
  },
];

export const SAVE_DEBOUNCE_TIME = 2000;

export const DefaultTemplateNodes: NodeDataType[] = [
  {
    id: '1',
    name: '开始节点',
    description: '工作流的起始节点，用于设定启动工作流需要的信息',
    type: 'start',
    config: {
      outputs: [
        {
          name: 'user_input',
          type: 'string',
          description: '用户本轮对话输入内容',
        },
      ],
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE3MC42NjcgMGg2ODIuNjY2UTEwMjQgMCAxMDI0IDE3MC42Njd2NjgyLjY2NlExMDI0IDEwMjQgODUzLjMzMyAxMDI0SDE3MC42NjdRMCAxMDI0IDAgODUzLjMzM1YxNzAuNjY3UTAgMCAxNzAuNjY3IDBaIiBmaWxsPSIjRUZGMUZGIi8+PHBhdGggZD0iTTM0MS4zMzMgMzQ4LjExN1Y2NTQuNTVhNDIuNjY3IDQyLjY2NyAwIDAgMCA2Mi41OTIgMzcuNzE4bDI5MC4xNzYtMTUzLjE3NGE0Mi42NjcgNDIuNjY3IDAgMCAwIDAtNzUuNTJMNDAzLjkyNSAzMTAuNGE0Mi42NjcgNDIuNjY3IDAgMCAwLTYyLjU5MiAzNy43MTd6IiBmaWxsPSIjNDQ1RUZGIi8+PC9zdmc+',
  },
  {
    id: '2',
    position: {
      x: 200,
      y: 100,
    },
    name: '结束节点',
    description: '工作流的最终节点，用于返回工作流运行后的结果信息',
    type: 'end',
    config: {
      inputs: {
        input_param: [
          {
            name: 'response',
            type: 'string',
            value: {
              type: 'reference',
            },
          },
        ],
        prompt: {
          name: 'response',
          type: 'string',
          description: '输出内容',
          value: {
            type: 'reference',
            content: '{{response}}',
          },
        },
      },
      outputs: [
        {
          name: 'output',
          type: 'string',
        },
      ],
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTcwNCAxMDI0SDMyMEMxNDQgMTAyNCAwIDg4MCAwIDcwNFYzMjBDMCAxNDQgMTQ0IDAgMzIwIDBoMzg0YzE3NiAwIDMyMCAxNDQgMzIwIDMyMHYzODRjMCAxNzYtMTQ0IDMyMC0zMjAgMzIweiIgZmlsbD0iI0RDRjZFQSIvPjxwYXRoIGQ9Ik00NDQuOCA3NzEuMmMtMTYgMC0zMi02LjQtNDEuNi0xOS4yTDIzNi44IDU4NS42Yy0yMi40LTIyLjQtMjIuNC02MC44IDAtODYuNCAyMi40LTIyLjQgNjAuOC0yMi40IDg2LjQgMEw0NDggNjI0bDI4NC44LTMxNi44YzIyLjQtMjIuNCA2MC44LTIyLjQgODYuNCAwIDIyLjQgMjIuNCAyMi40IDYwLjggMCA4Ni40TDQ4Ni40IDc1MmMtMTIuOCAxMi44LTI1LjYgMTkuMi00MS42IDE5LjJ6bTAgMCIgZmlsbD0iIzRFQkQ4QSIvPjwvc3ZnPg==',
  },
  {
    id: '3',
    name: '大模型节点',
    description: '调用大语言模型,使用变量和提示词生成回复',
    type: 'llm',
    config: {
      inputs: {
        input_param: [
          {
            name: 'input',
            description: null,
            type: 'string',
            value: {
              type: 'reference',
            },
          },
          {
            name: 'background',
            description: null,
            type: 'string',
            value: {
              type: 'reference',
            },
          },
        ],
        llm_param: [
          {
            type: 'string',
            name: 'id',
            value: {
              type: 'value',
              content: 'qwen_llm',
            },
          },
          {
            type: 'string',
            name: 'model_name',
            value: {
              content: 'qwen-max',
              type: 'value',
            },
          },
          {
            type: 'string',
            name: 'temperature',
            value: {
              content: '0.7',
              type: 'value',
            },
          },
          {
            type: 'string',
            name: 'prompt',
            value: {
              type: 'value',
              content:
                '你是一位精通信息分析的ai助手。你的目标是使用中文结合查询的背景信息及你所拥有的知识回答用户提出的问题。\n你需要遵守的规则是:\n1. 必须使用中文结合查询的背景信息结合你所拥有的知识回答用户提出的问题。\n2. 结构化答案生成，必要时通过空行提升阅读体验。\n3. 不采用背景信息中的错误信息。\n4. 要考虑答案和问题的相关性，不做对问题没有帮助的回答。\n5. 详尽回答问题，重点突出，不过多花哨词藻。\n6. 不说模糊的推测。\n7. 尽量多的使用数值类信息。\n\n背景信息是:\n{{background}}\n\n开始!\n需要回答的问题是: {{input}}\n',
            },
          },
        ],
      },
      outputs: [
        {
          type: 'string',
          name: 'output',
        },
      ],
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTIxOS40MjkgMEg4MDQuNTdRMTAyNCAwIDEwMjQgMjE5LjQyOVY4MDQuNTdRMTAyNCAxMDI0IDgwNC41NzEgMTAyNEgyMTkuNDNRMCAxMDI0IDAgODA0LjU3MVYyMTkuNDNRMCAwIDIxOS40MjkgMFoiIGZpbGw9IiM0QTU1RkYiLz48cGF0aCBkPSJtNTY3LjUxNSAxOTYuMTcgMTk4Ljk0OSAxMTQuODMzYTk5LjQ3NCA5OS40NzQgMCAwIDEgNDkuNyA4Ni4xNjN2MjI5LjY2OGE5OS40NzQgOTkuNDc0IDAgMCAxLTQ5LjczNyA4Ni4xMjZMNTY3LjUxNSA4MjcuNzk0YTk5LjQ3NCA5OS40NzQgMCAwIDEtOTkuNDc0IDBMMjY5LjE2NiA3MTIuOTZhOTkuNDc0IDk5LjQ3NCAwIDAgMS00OS43MzctODYuMTI2VjM5Ny4xNjZhOTkuNDc0IDk5LjQ3NCAwIDAgMSA0OS43MzctODYuMTYzTDQ2OC4wNzggMTk2LjE3YTk5LjQ3NCA5OS40NzQgMCAwIDEgOTkuNDc0IDB6bTEwNC40NDggMjUyLjAxM2EzMy4xNyAzMy4xNyAwIDAgMC00NS44MjQtOS45NDhsLTExNS4yIDc0LjEzLTExNC40NjgtNzQuMDU2LTMuNDAxLTEuOTAyYTMzLjEzNCAzMy4xMzQgMCAwIDAtMzIuNjIyIDU3LjU2M2wxMzIuNDk4IDg1LjcyNCAzLjc2NyAyLjA4NGEzMy4xNyAzMy4xNyAwIDAgMCAzMi4xODMtMi4wNDhsMTMzLjEyLTg1LjcyMyAzLjE0NS0yLjIzMWEzMy4xMzQgMzMuMTM0IDAgMCAwIDYuODAyLTQzLjU1N3oiIGZpbGw9IiNGRkYiLz48L3N2Zz4=',
  },
  {
    id: '4',
    name: '知识库',
    description: null,
    type: 'knowledge',
    config: {
      inputs: {
        knowledge_param: [
          {
            type: 'string',
            name: 'id',
          },
          {
            type: 'string',
            name: 'top_k',
            value: {
              type: 'value',
              content: '2',
            },
          },
        ],
        input_param: [
          {
            type: 'string',
            name: 'query',
            value: {
              type: 'reference',
            },
          },
        ],
      },
      outputs: [
        {
          name: 'output',
          type: 'string',
        },
      ],
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg3Ni40MDcgOTU0LjE2M0gxODUuNDEyYTQ2LjY5NCA0Ni42OTQgMCAwIDEtNDYuODk5LTQ2LjU1OGMwLTI1LjY2OSAyMS4wMjYtNDYuNDkgNDYuOS00Ni40OWg0OTEuOTI5VjBIMTM4LjUxM0M5OS43MzggMCA2OC4yNjcgMzEuMjY2IDY4LjI2NyA2OS44Mzd2ODM3Ljc2OGExMTYuNzM2IDExNi43MzYgMCAwIDAgMTE3LjE0NSAxMTYuMzk0aDY5MC45OTVhMzUuMDIgMzUuMDIgMCAwIDAgMzUuMTU4LTM0Ljg4NCAzNS4wMiAzNS4wMiAwIDAgMC0zNS4xNTgtMzQuOTUyeiIgZmlsbD0iI2ViNmE2NCIvPjxwYXRoIGQ9Ik04MzQuMDgyIDBoLTEwMy4yMnY4NDMuMjk4aDEwMy4yMmM0Mi44MDMgMCA3Ny40ODMtMzAuNjUyIDc3LjQ4My02OC40MDRWNjguMzM0QzkxMS41NjUgMzAuNjUzIDg3Ni44ODUgMCA4MzQuMDgyIDB6IiBmaWxsPSIjZWI2YTY0Ii8+PC9zdmc+',
  },
  {
    id: '5',
    name: '工具',
    description: null,
    type: 'tool',
    position: {
      x: 500,
      y: 100,
    },
    config: {
      inputs: {
        tool_param: [
          {
            type: 'string',
            name: 'id',
          },
        ],
        input_param: [
          {
            type: 'string',
            name: 'input',
            value: {
              type: 'value',
              content: 'output',
            },
          },
        ],
      },
      outputs: [
        {
          name: 'output',
          type: 'string',
        },
      ],
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMHoiIGZpbGw9IiMyMDI0MjUiIG9wYWNpdHk9Ii4wMSIvPjxwYXRoIGQ9Ik0yNTYgMTcwLjY3N0ExMTkuNDc3IDExOS40NzcgMCAwIDEgMzc1LjQ3NyA1MS4yaDI3My4wNDZBMTE5LjQ3NyAxMTkuNDc3IDAgMCAxIDc2OCAxNzAuNjc3djE3MC42NDZhODUuMzIzIDg1LjMyMyAwIDAgMS04NS4zMjMgODUuMzU0SDM0MS4zMjNBODUuMzIzIDg1LjMyMyAwIDAgMSAyNTYgMzQxLjMyM1YxNzAuNjc3ek0zNzUuNDc3IDE1My42YTE3LjA3NyAxNy4wNzcgMCAwIDAtMTcuMDc3IDE3LjA3N3YxNTMuNmgzMDcuMnYtMTUzLjZhMTcuMDc3IDE3LjA3NyAwIDAgMC0xNy4wNzctMTcuMDc3SDM3NS40Nzd6bS0zMDcuMiA0NjAuOGMwLTE4Ljg1NCAxNS4yNy0zNC4xMjMgMzQuMTIzLTM0LjEyM2g4MTkuMmMxOC44NTQgMCAzNC4xMjMgMTUuMjcgMzQuMTIzIDM0LjEyM3YyMDQuOEExMzYuNTIzIDEzNi41MjMgMCAwIDEgODE5LjIgOTU1LjcyM0gyMDQuOEExMzYuNTIzIDEzNi41MjMgMCAwIDEgNjguMjc3IDgxOS4yVjYxNC40eiIgZmlsbD0iI0Y3NCIvPjxwYXRoIGQ9Ik02OC4yNzcgMzc1LjQ3N0ExMzYuNTIzIDEzNi41MjMgMCAwIDEgMjA0LjggMjM4LjkyM2g2MTQuNGExMzYuNTIzIDEzNi41MjMgMCAwIDEgMTM2LjUyMyAxMzYuNTU0VjUxMmMwIDE4Ljg1NC0xNS4yNyAzNC4xMjMtMzQuMTIzIDM0LjEyM0gxMDIuNEEzNC4xMjMgMzQuMTIzIDAgMCAxIDY4LjI3NyA1MTJWMzc1LjQ3N3oiIGZpbGw9IiNGQTQiLz48cGF0aCBkPSJNMzc1LjQ3NyA1MTJjMC0xOC44NTQgMTUuMjctMzQuMTIzIDM0LjEyMy0zNC4xMjNoMjA0LjhjMTguODU0IDAgMzQuMTIzIDE1LjI3IDM0LjEyMyAzNC4xMjN2MTAyLjRjMCAxOC44NTQtMTUuMjcgMzQuMTIzLTM0LjEyMyAzNC4xMjNINDA5LjZhMzQuMTIzIDM0LjEyMyAwIDAgMS0zNC4xMjMtMzQuMTIzVjUxMnoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=',
  },
  {
    id: '6',
    name: '智能体',
    description: null,
    type: 'agent',
    config: {
      inputs: {
        agent_param: [
          {
            type: 'string',
            name: 'id',
            value: 'demo_rag_agent',
          },
        ],
        input_param: [
          {
            type: 'string',
            name: 'input',
            value: {
              type: 'reference',
            },
          },
        ],
      },
      outputs: [
        {
          name: 'output',
          type: 'string',
        },
      ],
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMFYwWiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yNTYgMjMyLjcyN2g1MTJxMTg2LjE4MiAwIDE4Ni4xODIgMTg2LjE4MnYzMjUuODE4cTAgMTg2LjE4Mi0xODYuMTgyIDE4Ni4xODJIMjU2cS0xODYuMTgyIDAtMTg2LjE4Mi0xODYuMTgyVjQxOC45MXEwLTE4Ni4xODIgMTg2LjE4Mi0xODYuMTgyWiIgZmlsbD0iIzZBMkZGRiIvPjxwYXRoIGQ9Ik02NTMuMTI2IDU4Mi4yODRhNDEuNzUxIDQxLjc1MSAwIDAgMS00MS42NTgtNDEuNjU5di00MS42NThjMC0yMi45IDE4Ljc1Ny00MS42MTEgNDEuNjU4LTQxLjYxMXM0MS42MTEgMTguNzEgNDEuNjExIDQxLjYxMXY0MS42NThhNDEuNzUxIDQxLjc1MSAwIDAgMS00MS42MTEgNDEuNjEyem0tMjgxLjA0MiAwYTQxLjc1MSA0MS43NTEgMCAwIDEtNDEuNjExLTQxLjY1OXYtNDEuNjU4YzAtMjIuOSAxOC43MTEtNDEuNjExIDQxLjYxMS00MS42MTFzNDEuNjU5IDE4LjcxIDQxLjY1OSA0MS42MTF2NDEuNjU4YTQxLjc1MSA0MS43NTEgMCAwIDEtNDEuNjU5IDQxLjYxMnoiIGZpbGw9IiNGRkYiLz48cGF0aCBkPSJNMzAyLjM2IDgyLjU3MiAzODQuNjA0IDIyNWE0MS43NTEgNDEuNzUxIDAgMCAxLTE1LjIyIDU2LjkyNSA0MS43NTEgNDEuNzUxIDAgMCAxLTU2Ljg3OS0xNS4yNjdMMjMwLjI2IDEyNC4yNzZhNDEuNzUxIDQxLjc1MSAwIDAgMSAxNS4yMi01Ni44NzggNDEuNzUxIDQxLjc1MSAwIDAgMSA1Ni44OCAxNS4yMnptMzgyLjQ2MyAwTDYwMi42MjQgMjI1YTQxLjc1MSA0MS43NTEgMCAwIDAgMTUuMjIgNTYuOTI1IDQxLjc1MSA0MS43NTEgMCAwIDAgNTYuODc5LTE1LjI2N2w4Mi4yNDYtMTQyLjQzYTQxLjc1MSA0MS43NTEgMCAwIDAtMTUuMjY3LTU2Ljg3OCA0MS43NTEgNDEuNzUxIDAgMCAwLTU2Ljg3OSAxNS4yMnoiIGZpbGw9IiM2QTJGRkYiLz48L3N2Zz4=',
  },
  {
    id: '7',
    name: '条件判断',
    description: null,
    type: 'ifelse',
    config: {
      inputs: {
        branches: [
          {
            name: 'branch-1',
            conditions: [
              {
                compare: 'equal',
                left: {
                  type: 'string',
                  value: {
                    type: 'reference',
                  },
                },
                right: {
                  type: 'string',
                  value: {
                    type: 'reference',
                  },
                },
              },
            ],
          },
        ],
      },
    },
    icon: 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE3MC42NjcgMGg2ODIuNjY2UTEwMjQgMCAxMDI0IDE3MC42Njd2NjgyLjY2NlExMDI0IDEwMjQgODUzLjMzMyAxMDI0SDE3MC42NjdRMCAxMDI0IDAgODUzLjMzM1YxNzAuNjY3UTAgMCAxNzAuNjY3IDBaIiBmaWxsPSIjMjg3OEZGIiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Im01MjMuOTQ3IDE3My4yMjcgMjE4Ljk2NSAxMDAuNTIyYTI1LjI1OSAyNS4yNTkgMCAwIDEgMCA0Ni41MDdsLTIwMy42MDUgOTMuNDR2ODQuMzFsLS4wNDMgMi4zODloMTUwLjIzYzI5Ljg2NiAwIDU0LjEgMjIuNjk4IDU0LjYxMyA1MC44NTh2MTAwLjE4Mmg4MS45MmMxNS4xMDQgMCAyNy4zMDYgMTEuNTYyIDI3LjMwNiAyNS44NTZ2MTUwLjE4NmMwIDE0LjI5NC0xMi4yNDUgMjUuODU2LTI3LjMwNiAyNS44NTZINjA3LjU3M2MtMTUuMTA0IDAtMjcuMzA2LTExLjU2Mi0yNy4zMDYtMjUuODU2VjY3Ny4yOTFjMC0xNC4yOTQgMTIuMjQ1LTI1Ljg1NiAyNy4zMDYtMjUuODU2aDgxLjkydi05OS4zMjhIMzM0LjUwN3Y5OS4zMjhoODEuOTJjMTUuMTA0IDAgMjcuMzA2IDExLjU2MiAyNy4zMDYgMjUuODU2djE1MC4xODZjMCAxNC4yOTQtMTIuMjQ1IDI1Ljg1Ni0yNy4zMDYgMjUuODU2SDE5Ny45NzNjLTE1LjA2MSAwLTI3LjMwNi0xMS41NjItMjcuMzA2LTI1Ljg1NlY2NzcuMjkxYzAtMTQuMjk0IDEyLjI0NS0yNS44NTYgMjcuMzA2LTI1Ljg1Nmg4MS45MnYtOTkuMzI4YzAtMjguMjQ2IDIzLjk3OS01MS4yIDUzLjcxOC01MS42N2gxNTEuMDgydi04Ni43NDFsLTIwMy42MDUtOTMuNDRhMjUuMjU5IDI1LjI1OSAwIDAgMSAwLTQ2LjUwN2wyMTkuMDA4LTEwMC40OGEyOC41ODcgMjguNTg3IDAgMCAxIDIzLjgwOCAweiIgZmlsbD0iIzI4NzhGRiIvPjwvc3ZnPg==',
  },
];
