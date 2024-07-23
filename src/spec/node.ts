import { FormSchema } from './FormSchema';
import { UUID } from './uuid';

export interface FlowNode {
  uuid: string; // uuid 	唯一id
  name: string; // string	节点名称
  description: string; // string	节点描述
  type: EType; //enum Type	节点类型

  position: Position;
  width?: number; //	number	节点宽度
  height?: number; //	number	节点高度

  nodeType: NodeType;

  input?: FormSchema; //json shcema	输入描述 用来渲染表单
  output?: FormSchema; //	json shcema	输出描述
  property?: FormSchema; //		属性描述
}

interface Position {
  x: number;
  y: number;
}

// 不同类型的节点的基础类
//

/**
 * 节点类型
 * - 插件
 * - 大模型
 * - 代码
 */
enum EType {
  start,
  plugin,
  LLM,
  code,
}

/**
 * 节点类型
 */
enum NodeType {
  StartNode = 'StartNode',
  PluginNode = 'PluginNode',
}

/**
 * 开始节点
 * 只设置输入
 * 输出和输入一致
 */
export class StartNode implements FlowNode {
  nodeType: NodeType = NodeType.StartNode;
  property?: FormSchema | undefined;
  position: Position = {
    x: 0,
    y: 0,
  };
  width: number = 200;
  height: number = 400;
  name: string = '开始节点';
  uuid: string = UUID.getInstance().uniqueID();
  type: EType = EType.start;
  description: string = '开始节点';

  input = new FormSchema();

  get output() {
    return this.input;
  }

  toJson() {
    const node: FlowNode = {
      name: this.name,
      uuid: this.uuid,
      type: this.type,
      description: this.description,
      input: this.input,
      output: this.output,
      position: this.position,
      width: this.width,
      height: this.height,
      nodeType: this.nodeType,
    };
    return JSON.stringify(node);
  }

  fromJson(json: string) {
    const node: StartNode = JSON.parse(json);
    this.name = node.name;
    this.uuid = node.uuid;
    this.type = node.type;
    this.description = node.description;
    this.input = node.input;
    this.position = node.position;
    this.width = node.width;
    this.height = node.height;
    this.nodeType = node.nodeType;
  }

  toXYFlowJson() {}
}

// /**
//  * 插件节点
//  */
// export class PluginNode implements FlowNode {
//   extend(e) {}
// }
// class BingPluginNode extends PluginNode {}

// new BingPluginNode().extend({
//   inpot: (JSONSchema = {
//     type: 'object',
//     properties: {
//       count: {
//         type: 'integer',
//       },
//       offset: {
//         type: 'integer',
//       },
//       query: {
//         type: 'string',
//       },
//     },
//     required: ['a'],
//   }),
// });
