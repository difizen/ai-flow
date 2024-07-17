import { FormSchema } from './node';

describe('getSchemaByPoint', () => {
  it('基础路径 /', () => {
    const input = new FormSchema();
    input.jsonschema = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          description: 'this is a',
        },
        b: {
          type: 'object',
          properties: {
            c: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    };

    expect(input.getSchemaByPoint('/')).toEqual({
      type: 'object',
      properties: {
        a: {
          type: 'string',
          description: 'this is a',
        },
        b: {
          type: 'object',
          properties: {
            c: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    });
  });

  it('如果对应路径没有参数，应该创建一个properties对象，并且返回该对象', () => {
    const input = new FormSchema();
    input.jsonschema = {
      type: 'object',
      properties: {},
    };

    const got = input.getSchemaByPoint('/a');
    // 没有对应的属性
    expect(got).toEqual({});

    expect(input.jsonschema).toEqual({
      type: 'object',
      properties: {
        a: {},
      },
    });
  });

  it('获取对应的schema', () => {
    const input = new FormSchema();
    input.jsonschema = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          description: 'this is a',
        },
        b: {
          type: 'object',
          properties: {
            c: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    };
    expect(input.getSchemaByPoint('/a')).toEqual({
      type: 'string',
      description: 'this is a',
    });

    expect(input.getSchemaByPoint('/b')).toEqual({
      type: 'object',
      properties: {
        c: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    });
  });

  it('数组则返回对应的数组对象', () => {
    const input = new FormSchema();
    input.jsonschema = {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          description: 'this is a',
        },
        b: {
          type: 'object',
          properties: {
            c: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    };

    // 数组则返回对应的对象
    expect(input.getSchemaByPoint('/b/c')).toEqual({
      type: 'array',
      items: {
        type: 'string',
      },
    });
  });
});

describe('addField', () => {
  it('添加表单field', () => {
    const input = new FormSchema();
    input.addField('/', 'a', 'object', 'this is a', false);
    const got = input.log();
    console.log(got, '==got');
    expect(got).toMatchSnapshot();
    // expect(1).toBe(0);
  });

  it('添加表单field1', () => {
    const input = new FormSchema();
    input.addField('/', 'a', 'object', 'this is a', false);
    console.log(input.log(), 'log1');
    input.addField('/a/b', 'b', 'string', 'this is desc', true);
    input.addField('/a', 'subA', 'object', 'this is desc', true);
    input.addField('/a/subA', 'aryC', 'array', 'this is desc', true);
    input.addField('/', 'first', 'object', 'this is a', true);
    const got = input.log();
    console.log(got);
    expect(got).toMatchSnapshot();
  });
});
