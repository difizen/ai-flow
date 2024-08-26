import { Input } from 'antd';
import React from 'react';
import { CascaderInNode } from '../AIBasic/CascaderInNode';
import { SelectInNode } from '../AIBasic/SelectInNode';

export const ReferenceSelect = (props: {
  value?: {
    type: 'ref' | 'value';
    content?: string;
  };
  onChange?: (value: { type: 'ref' | 'value'; content?: string }) => void;
  refOptions: { label: string; content: string }[];
}) => {
  const { value, onChange, refOptions } = props;
  console.log('🚀 ~ value:', value);

  return (
    <div className="flex gap-2">
      <SelectInNode
        defaultValue={value?.type || 'ref'}
        style={{ width: 120 }}
        onChange={(val) =>
          onChange?.({
            type: val,
          })
        }
        options={[
          { label: 'ref', value: 'ref' },
          { label: 'value', value: 'value' },
        ]}
      />

      {value?.type !== 'ref' ? (
        <Input
          onChange={(e) =>
            onChange?.({
              type: value.type,
              content: e.target.value,
            })
          }
        />
      ) : (
        <CascaderInNode
          style={{ width: 120 }}
          value={value?.content || []}
          onChange={(val) =>
            onChange?.({
              type: value.type,
              content: val,
            })
          }
          options={refOptions}
        />
      )}
    </div>
  );
};
