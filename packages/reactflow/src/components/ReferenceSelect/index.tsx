import type { SchemaValueType, ValueType } from '@/interfaces/flow';
import { Input } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { memo } from 'react';

import { CascaderInNode } from '../AIBasic/CascaderInNode/index';
import { SelectInNode } from '../AIBasic/SelectInNode/index';
import React from 'react';

export const ReferenceSelectRaw = (props: {
  value?: SchemaValueType;
  onChange?: (value: SchemaValueType) => void;
  refOptions: DefaultOptionType[];
}) => {
  const { value, onChange, refOptions } = props;

  return (
    <div className="flex gap-2 w-[100%]">
      <SelectInNode
        value={value?.type || 'reference'}
        style={{ width: '30%' }}
        onChange={(val: ValueType) =>
          onChange?.({
            type: val,
          })
        }
        options={[
          { label: '引用', value: 'reference' },
          { label: '值', value: 'value' },
        ]}
      />

      {value?.type === 'value' ? (
        <Input
          style={{ width: '70%' }}
          value={value?.content}
          onChange={(e) =>
            onChange?.({
              type: value.type,
              content: e.target.value,
            })
          }
        />
      ) : (
        <CascaderInNode
          style={{ width: '70%' }}
          value={value?.content || []}
          onChange={(val: (string | number | null)[]) =>
            onChange?.({
              type: value?.type || 'reference',
              content: val as [string, string],
            })
          }
          options={refOptions}
        />
      )}
    </div>
  );
};

export const ReferenceSelect = memo(ReferenceSelectRaw);
