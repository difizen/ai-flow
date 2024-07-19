import { ApiTwoTone } from '@ant-design/icons';
import { Handle } from '@xyflow/react';
import React from 'react';
import { NodeHeader } from './Header';
import { NodeStatus } from './Status';

type Props = {
  data: any;
  selected: boolean;
  xPos: number;
  yPos: number;
};

export const CustomBaseNode = ({ data }: Props) => {
  console.log('🚀 ~ CustomBaseNode ~ data:', data);
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-[#000]/10 shadow h-[300px] w-[400px] bg-white">
      {/* <NodeToolbar>
        <Button>什么按钮</Button>
      </NodeToolbar> */}
      <NodeStatus status={'success' as any} runDuration={1020} />
      <Handle
        type="source"
        position="left"
        style={{ background: 'rgb(59 130 246)' }}
      />
      <Handle
        type="target"
        position="right"
        style={{ background: 'rgb(59 130 246)' }}
      />
      <NodeHeader name={data.name} icon={<ApiTwoTone />} />
      <div className="h-[100%] p-3 text-xs text-gray-400 flex flex-col gap-3">
        <div>输入配置</div>
        <div>节点配置</div>
        <div>输出配置</div>
      </div>
    </div>
  );
};
