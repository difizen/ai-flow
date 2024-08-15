import { InputSchema, NodeType } from '@/interfaces/flow';
import {
  CaretRightOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import { ReferenceSelect } from '../ReferenceSelect';

export interface RefrenceFormProps {
  label: string;
  values: InputSchema[];
  onChange: (values: []) => void;
  nodes: NodeType[];
}

export const RefrenceForm = (props: RefrenceFormProps) => {
  const { label, values, onChange, nodes } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('variables', values);
  }, []);

  const options = nodes.map((node) => {
    return {
      label: node.data.nodeMeta.title,
      value: node.data.id,
      children:
        node.data?.config?.outputs?.map((output) => {
          return {
            label: output.name,
            key: output.name,
          };
        }) || [],
    };
  });

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      items={[
        {
          key: '1',
          label: label,
          children: (
            <Form
              form={form}
              name="dynamic_form_nest_item"
              autoComplete="off"
              onValuesChange={(_, allFields) => {
                form.validateFields().then(() => {
                  if (allFields.variables)
                    onChange(
                      allFields.variables.filter(
                        (item: any) => item !== undefined,
                      ),
                    );
                });
              }}
            >
              <div className="mb-[-10px]">
                <Form.List name="variables">
                  {() => (
                    <>
                      <Space style={{ display: 'flex' }} align="baseline">
                        <Form.Item className="w-[240px]">参数名</Form.Item>
                        <Form.Item className="w-[200px]">变量值</Form.Item>
                      </Space>
                    </>
                  )}
                </Form.List>
              </div>
              <Form.List name="variables">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex' }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          className="w-[240px]"
                          rules={[
                            { required: true, message: '变量名不可为空' },
                          ]}
                        >
                          <Input placeholder="变量名" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          className="w-[200px]"
                        >
                          <ReferenceSelect refOptions={options} />
                        </Form.Item>

                        <MinusCircleOutlined
                          className="cursor-pointer"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加变量
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          ),
        },
      ]}
    ></Collapse>
  );
};
