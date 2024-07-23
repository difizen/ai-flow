import { CaretRightOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Collapse,
  Flex,
  Input,
  Select,
  Space,
  theme,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { FlowNode } from '../spec/node';

interface CascaderOptions {
  value: string;
  label: string;
  children?: CascaderOptions[];
}

/**
 * 把jsonschema 转成cascader的options
 */
const getCascaderOptions = (node: FlowNode) => {
  const jsonSchema = node.input?.jsonschema;
  const options: CascaderOptions[] = [
    { label: `${node.name}`, value: node.name, children: [] },
  ];

  // 递归解析JSONSchema
  const parseSchema = (schema: any): CascaderOptions[] => {
    const parsedOptions: CascaderOptions[] = [];

    for (const key in schema.properties) {
      if (Object.hasOwn(schema.properties, key)) {
        const type = schema.properties[key]?.type;
        const label = `${key}-${type}`;
        if (type === 'object') {
          const childOptions: CascaderOptions[] = parseSchema(
            schema.properties[key],
          );
          parsedOptions.push({
            value: key,
            label: label,
            children: childOptions,
          });
        } else {
          parsedOptions.push({
            value: key,
            label: label,
          });
        }
      }
    }
    return parsedOptions;
  };

  if (jsonSchema && typeof jsonSchema === 'object') {
    for (const key in jsonSchema.properties) {
      if (Object.hasOwn(jsonSchema.properties, key)) {
        const type = jsonSchema.properties[key]?.type;
        const label = `${key}-${type}`;

        const rootOptions: CascaderOptions[] = options[0]!
          .children as CascaderOptions[];

        if (type === 'object') {
          const childOptions: CascaderOptions[] = parseSchema(
            jsonSchema.properties[key],
          );
          rootOptions.push({
            value: key,
            label: label,
            children: childOptions,
          });
        } else {
          rootOptions.push({
            value: key,
            label: label,
          });
        }
      }
    }
  }

  return options;
};

interface ParameterValue {
  variableName: string;
  variableType: 'ref' | 'input';
  variableValue: string | string[];
}

const Parameter = (props: {
  flowNodes?: FlowNode[];
  onChange?: (values: ParameterValue) => void;
  values?: ParameterValue;
}) => {
  const { flowNodes = [], onChange } = props;

  const [value, setValue] = useState<ParameterValue>({
    variableName: '',
    variableType: 'ref',
    variableValue: '',
  });

  const options: CascaderOptions[] = useMemo(() => {
    let opt = [] as CascaderOptions[];
    flowNodes.forEach((v) => {
      opt = [...opt, ...getCascaderOptions(v)];
    });
    return opt;
  }, [flowNodes]);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  useEffect(() => {
    if (props.values) {
      setValue(props.values);
    }
  }, [props.values]);

  return (
    <Space>
      <Input
        placeholder={'请输入变量名'}
        onChange={(v) => {
          setValue((s) => {
            return {
              ...s,
              variableName: v.target.value,
            };
          });
        }}
      />
      <Select
        value={value.variableType}
        onChange={(v) => {
          setValue((s) => {
            return {
              ...s,
              variableType: v,
              variableValue: '',
            };
          });
        }}
        options={[
          {
            label: '引用',
            value: 'ref',
          },
          {
            label: '输入',
            value: 'input',
          },
        ]}
      ></Select>
      {value.variableType === 'ref' ? (
        <Cascader
          options={options}
          onChange={(v) => {
            setValue((s) => {
              return {
                ...s,
                variableValue: v,
              };
            });
          }}
          placeholder="Please select"
        />
      ) : (
        <Input
          placeholder={'请输入变量名'}
          onChange={(v) => {
            setValue((s) => {
              return {
                ...s,
                variableValue: v.target.value,
              };
            });
          }}
        />
      )}
    </Space>
  );
};

/**
 * 支持引用的表单
 * @returns
 */
export const RefForm = (props: {
  flowNodes?: FlowNode[];
  values?: ParameterValue[];
  onChange?: (values: ParameterValue[]) => void;
}) => {
  const { flowNodes = [] } = props;

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const [values, setValues] = useState<ParameterValue[]>([
    {
      variableName: '',
      variableType: 'ref',
      variableValue: '',
    },
  ]);

  useEffect(() => {
    if (props.values) {
      setValues(props.values);
    }
  }, [props.values]);

  useEffect(() => {
    props.onChange?.(values);
  }, [values]);

  const renderParamters = useMemo(() => {
    return values.map((v, i) => {
      return (
        <Parameter
          key={i}
          flowNodes={flowNodes}
          onChange={(val) => {
            setValues((s) => {
              return [...s.slice(0, i), val, ...s.slice(i + 1)];
            });
          }}
        ></Parameter>
      );
    });
  }, [values]);

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={[
          {
            style: panelStyle,
            key: '1',
            label: '输入',
            children: (
              <Flex vertical gap="small">
                <Flex gap={150} className="labels">
                  <div className="label">
                    <span>参数名</span>
                  </div>
                  <div className="label">
                    <span>参考值</span>
                  </div>
                </Flex>
                {renderParamters}
                <div>
                  <Button
                    onClick={() => {
                      setValues((s) => {
                        return [
                          ...s,
                          {
                            variableName: '',
                            variableType: 'ref',
                            variableValue: '',
                          },
                        ];
                      });
                    }}
                  >
                    新增
                  </Button>
                </div>
              </Flex>
            ),
          },
        ]}
      ></Collapse>
    </div>
  );
};
