---
title: 自定义节点
order: 3
group: { title: '快速开始', order: 1 }
toc: menu
---

节点包含多部分。
NodeWrapper 组件是封装的节点外层包裹组件，便于自定义风格统一的节点，NodeWrapper 组件内定义了包含:

- 节点的border
- 节点的toolbar
- 节点的名称、icon、描述信息
- 节点的连接桩
- 节点内的内容
  - 节点内展示的配置
  - 节点对应弹窗的配置项

节点内的信息或配置项，可以直接展示在画布的节点上，也可以通过点击节点唤起配置面板，继而在配置面板配置。

``` tsx | pure
export const NodeComponentMap: Record<string, ComponentType<any>> = {
  [BlockEnum.Start]: StartNode,
  [BlockEnum.End]: EndNode,
  [BlockEnum.LLM]: LLMNode,
  [BlockEnum.Knowledge]: KnowledgeNode,
  [BlockEnum.IfElse]: IfElseNode,
};

export const PanelComponentMap: Record<string, ComponentType<any>> = {
  [BlockEnum.LLM]: LLMPanel,
  [BlockEnum.End]: EndPanel,
  [BlockEnum.Knowledge]: KnowledgePanel,
};
```
