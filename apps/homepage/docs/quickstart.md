---
sidebar_position: 1
---

# QuickStart


## 安装

```bash
tnpm install @difizen/ai-workflow --save
```

## 基本使用

遵循以下步骤, 你将完成一个简单的 AI 工作流

### 1. 引入 Flow

``` tsx
import React from 'react';
import { Flow } from '@alipay/ai-workflow';

const SimpleFlowExample = () => {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Flow />
    </div>
  );
};

export default SimpleFlowExample;
```

### 2. 使用内置 Node 组件

NodesPanel 组件是节点的拖拽区域。在 NodesPanel 组件定义内置节点的默认值，包括拖拽到画布上节点的名称、icon、描述、配置项默认值等信息。

节点的配置可以在节点上平铺，也可以在配置面板上配置。

``` tsx
import { Flow, NodesPanel, DefaultTemplateNodes } from '@alipay/ai-workflow';
const FlowWithPanel = (props: { toolbar?: React.ReactNode }) => {
  const { toolbar } = props;

  // 节点默认值
  
  
  return (
    <div className="flex">
      <NodesPanel
        className="w-[220px] z-10 bg-gray-50 shadow-lg h-[600px]"
        nodes={DefaultTemplateNodes}
      />
      <div className="flex-1">
        <Flow toolbar={toolbar} />
      </div>
    </div>
  );
}
export default FlowWithPanel;
```

### 3. 引入模型选择能力、知识库选择能力、工具

``` tsx | pure


```

### 4. DSL 数据接入

包括 flow 的初始化、保存

#### 4.1 flow 的初始化

Flow 组件传入 initialGraph，或调用 useFlowStore 的 initFlow 方法

#### 4.2 flow 的保存

内置自动保存能力，注册保存函数以及配置保存配置
