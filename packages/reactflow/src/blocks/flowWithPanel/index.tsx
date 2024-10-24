import {
  DefaultTemplateNodes,
  Flow,
  NodesPanel,
  useFlowStore,
} from '../../index';
import { Button } from 'antd';
import React, { useEffect } from 'react';

const Toolbar = () => {
  const { nodes, edges } = useFlowStore();

  return (
    <div className="flex gap-2">
      <Button onClick={() => {}}>发布</Button>
      <Button
        onClick={() => {
          localStorage.setItem(
            'ai-flow-test-data',
            JSON.stringify({
              nodes,
              edges,
            })
          );
        }}
      >
        保存
      </Button>
    </div>
  );
};
export const FlowWithPanel = () => {
  useEffect(() => {
    const data = localStorage.getItem('ai-flow-test-data');

    if (data) {
      const { nodes, edges } = JSON.parse(data);
      useFlowStore.setState({ nodes, edges });
    }
  }, []);
  return (
    <div className="flex">
      <NodesPanel
        className="w-[220px] z-10 bg-gray-50 shadow-lg h-[600px]"
        nodes={DefaultTemplateNodes}
      />
      <div className="flex-1">
        <Flow toolbar={<Toolbar />} />
      </div>
    </div>
  );
};
