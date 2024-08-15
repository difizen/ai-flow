import { Input, Space } from 'antd';
import React from 'react';
import { CascaderInNode } from '../AIBasic/CascaderInNode';
import { SelectInNode } from '../AIBasic/SelectInNode';

export const ReferenceSelect = (props: {
  value?: {
    type: 'ref' | 'literal';
    value?: string;
  };
  onChange?: (value: { type: 'ref' | 'literal'; value?: string }) => void;
  refOptions: { label: string; value: string }[];
}) => {
  const { value, onChange, refOptions } = props;
  console.log('🚀 ~ value:', value);

  return (
    <Space wrap>
      <SelectInNode
        selectorId="ref-select"
        defaultValue={value?.type || 'ref'}
        style={{ width: 120 }}
        onChange={(val) =>
          onChange?.({
            type: val,
          })
        }
        options={[
          { label: 'ref', value: 'ref' },
          { label: 'literal', value: 'literal' },
        ]}
      />

      {value?.type !== 'ref' ? (
        <Input />
      ) : (
        <CascaderInNode
          selectorId="ref-cascader"
          style={{ width: 120 }}
          value={value?.value || []}
          onChange={(val) =>
            onChange?.({
              type: value.type,
              value: val,
            })
          }
          options={refOptions}
        />
      )}
    </Space>
  );
};
