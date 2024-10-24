import type { VariableOption } from '@alipay/ai-workflow';
import { PromptEditor } from '@alipay/ai-workflow';
import { Button, Tag } from 'antd';
import React, { useState } from 'react';

export const DemoPromptEditor = () => {
  const [value, setValue] = useState<string>('');
  const [variables, setVariables] = useState<VariableOption[]>([]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        {variables.map((v) => (
          <Tag key={v.name}>{v.name}</Tag>
        ))}
        <Button
          type="primary"
          onClick={() =>
            setVariables((prev) => [
              ...prev,
              {
                name: '1',
                value: '2',
              },
            ])
          }
        >
          Add Variable
        </Button>
      </div>
      <div className="h-[200px] bg-white rounded-md cursor-pointer nodrag p-3 overflow-y-auto">
        <PromptEditor
          value={value}
          placeholder="请输入 Prompt"
          onChange={onChange}
          variableBlock={{
            show: true,
            variables,
          }}
        />
      </div>
    </div>
  );
};
