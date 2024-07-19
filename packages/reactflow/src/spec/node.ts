import {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from 'json-schema';
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

/**
 * 声明输入的表单数据格式
 * 表单内容
 */
export class FormSchema {
  jsonschema: JSONSchema7 = {
    type: 'object',
    properties: {},
    required: [],
  };

  /**
   * 获取指定路径的属性
   * 方便添加属性
   * @param pointer
   * @returns
   */
  getSchemaByPoint(pointer: string) {
    if (pointer === '/') {
      return this.jsonschema;
    }

    let pointers = pointer.split('/');
    if (pointers[0] !== '') {
      throw new Error('invalid pointer');
    }
    pointers = pointers.slice(1);

    // base是一个object模式
    let schema = this.jsonschema;
    while (pointers.length > 0) {
      const pointer = pointers.shift();
      if (pointer === undefined) {
        throw new Error('invalid pointer');
      }
      if (schema) {
        if (schema.type === 'object') {
          if (schema?.properties?.[pointer]) {
            // 有就递归下沉
            schema = schema.properties[pointer] as JSONSchema7;
          } else {
            // 没有属性就添加
            schema!.properties![pointer] = {};
            return schema!.properties![pointer];
          }
        } else if (schema?.type === 'array') {
          return schema;
        }
      }
    }
    return schema;
  }

  /**
   * 动态表单添加属性
   * @param property
   * @returns
   */
  addField = (
    pointer: string, // 指定属性路径，如 /a/b
    name: string,
    type: JSONSchema7TypeName,
    description: string,
    required: boolean,
  ) => {
    if (typeof this.jsonschema !== 'boolean') {
      const schema = this.getSchemaByPoint(pointer);
      // console.log(schema, '==schema', pointer);
      if (schema.type === 'array') {
        // 如果存在属性
        if (!schema?.items) {
          schema.items = {
            type: type,
            description,
          };
        } else if (!Array.isArray(schema?.items)) {
          const items = schema.items as JSONSchema7Definition;
          schema.items = [
            items,
            {
              type: type,
              description,
            },
          ];
        } else if (Array.isArray(schema?.items)) {
          schema.items.push({
            type: type,
            description,
          });
        }
      } else if (schema?.type === 'object') {
        schema.properties![name] = {
          type: type,
          description,
        };
        if (type === 'object') {
          schema.properties![name].properties = {};
        }
      } else {
        schema.type = type;
        schema.description = description;
      }
      if (required) {
        // 如果是object的话，require在当前位置添加
        if (schema.type === 'object') {
          if (!schema.required) {
            schema.required = [];
          }
          schema.required = [...schema.required, name];
        } else {
          // 在父级添加
          const parentPointer = pointer.split('/').slice(0, -1).join('/');
          const parentSchema = this.getSchemaByPoint(parentPointer);

          if (!parentSchema.required) {
            parentSchema.required = [];
          }
          parentSchema.required = [...parentSchema.required, name];
        }
      }
    }
    return false;
  };

  log() {
    return JSON.stringify(this.jsonschema, null, 4);
  }
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
    this.output = node.output;
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
