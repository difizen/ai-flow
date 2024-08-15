import { StartNode } from '@/components/Node/StartNode';

import { NodeType, NodeTypeEnum } from '@/interfaces/flow';

import { useFlowStore } from '@/stores/useFlowStore';
import { useShortcutsStore } from '@/stores/useShortcutsStore';
import { useUndoRedoStore } from '@/stores/useUndoRedoStore';
import { getNodeId } from '@/utils/reactflowUtils';
import {
  Background,
  Connection,
  OnSelectionChangeParams,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import CustomEdge from '../CustomEdge';
import { FlowController } from '../FlowController';
import { EndNode } from '../Node/EndNode';
import { KnowledgeNode } from '../Node/KnowledgeNode';
import { LLMNode } from '../Node/LLMNode';
import {
  handleCopy,
  handleCut,
  handleDelete,
  handleDuplicate,
  handlePaste,
  handleRedo,
  handleUndo,
} from './keys';

const nodeTypes = {
  [NodeTypeEnum.Start]: StartNode,
  [NodeTypeEnum.End]: EndNode,
  [NodeTypeEnum.LLM]: LLMNode,
  [NodeTypeEnum.Knowledge]: KnowledgeNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

interface FlowProps {
  miniMap?: boolean;
  classNames?: string;
}

function Flow(props: FlowProps) {
  const { miniMap = true, classNames } = props;
  const position = useRef({ x: 0, y: 0 });
  const [lastSelection, setLastSelection] =
    useState<OnSelectionChangeParams | null>(null);
  const reactFlowWrapper = useRef<any>(null);

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const setNodes = useFlowStore((state) => state.setNodes);
  // const setEdges = useFlowStore((state) => state.setEdges);
  const reactFlowInstance = useFlowStore((state) => state.reactFlowInstance);
  const setReactFlowInstance = useFlowStore(
    (state) => state.setReactFlowInstance,
  );
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);
  const onConnect = useFlowStore((state) => state.onConnect);

  const paste = useFlowStore((state) => state.paste);

  const undo = useUndoRedoStore((state) => state.undo);
  const redo = useUndoRedoStore((state) => state.redo);
  const takeSnapshot = useUndoRedoStore((state) => state.takeSnapshot);

  // Hot keys
  const undoAction = useShortcutsStore((state) => state.undo);
  const redoAction = useShortcutsStore((state) => state.redo);
  const copyAction = useShortcutsStore((state) => state.copy);
  const duplicate = useShortcutsStore((state) => state.duplicate);
  const deleteAction = useShortcutsStore((state) => state.delete);
  const cutAction = useShortcutsStore((state) => state.cut);
  const pasteAction = useShortcutsStore((state) => state.paste);
  useHotkeys(undoAction, (e) => handleUndo(e, undo));
  useHotkeys(redoAction, (e) => handleRedo(e, redo));
  useHotkeys(duplicate, (e) => handleDuplicate(e, paste, nodes, position));
  useHotkeys(copyAction, (e) => handleCopy(e, lastSelection, setLastSelection));
  useHotkeys(cutAction, (e) => handleCut(e, lastSelection, setLastSelection));
  useHotkeys(pasteAction, (e) =>
    handlePaste(e, lastSelection, takeSnapshot, paste, position),
  );
  useHotkeys(deleteAction, (e) =>
    handleDelete(e, lastSelection, deleteNode, deleteEdge, takeSnapshot),
  );
  useHotkeys('delete', (e) =>
    handleDelete(e, lastSelection, deleteNode, deleteEdge, takeSnapshot),
  );

  // useEffect(() => {
  //   const nodes: NodeType[] = [
  //     {
  //       id: 'node-1',
  //       type: 'start',
  //       data: {
  //         id: 'node-1',
  //         nodeType: NodeTypeEnum.LLM,
  //         nodeMeta: {
  //           title: '开始',
  //           icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-Start.png',
  //           description: '工作流的起始节点，用于设定启动工作流需要的信息',
  //         },
  //         config: {
  //           outputs: [
  //             {
  //               type: 'string',
  //               name: 'BOT_USER_INPUT',
  //               required: false,
  //               description: '用户本轮对话输入内容',
  //             },
  //           ],
  //         },
  //       },
  //       position: { x: 250, y: 50 },
  //     },
  //     {
  //       id: 'node-2',
  //       type: 'end',
  //       data: {
  //         id: 'node-2',
  //         nodeType: NodeTypeEnum.LLM,
  //         nodeMeta: {
  //           title: '结束',
  //           icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/dvsmryvd_avi_dvsm/ljhwZthlaukjlkulzlp/icon/icon-End.png',
  //           description: '工作流的最终节点，用于返回工作流运行后的结果信息',
  //         },
  //         config: {
  //           params: [
  //             {
  //               name: 'terminatePlan',
  //               input: {
  //                 type: 'string',
  //                 value: {
  //                   type: 'literal',
  //                   content: 'terminate',
  //                 },
  //               },
  //             },
  //             {
  //               name: 'streamingOutput',
  //               input: {
  //                 type: 'boolean',
  //                 value: {
  //                   type: 'literal',
  //                   content: true,
  //                 },
  //               },
  //             },
  //             {
  //               name: 'content',
  //               input: {
  //                 type: 'string',
  //                 value: {
  //                   type: 'literal',
  //                   content: '{{response_for_model}}',
  //                 },
  //               },
  //             },
  //           ],
  //           inputs: [
  //             {
  //               name: 'response_for_model',
  //               input: {
  //                 type: 'string',
  //                 value: {
  //                   type: 'ref',
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       position: { x: 1450, y: 100 },
  //     },

  //   ];
  //   setNodes(nodes);
  //   setEdges([
  //     {
  //       id: 'xy-edge__node-2-node-1',
  //       source: 'node-2',
  //       target: 'node-1',
  //       type: 'custom',
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    reactFlowInstance?.fitView();
  }, [reactFlowInstance]);

  const onConnectMod = useCallback(
    (params: Connection) => {
      takeSnapshot();
      onConnect(params);
    },
    [takeSnapshot, onConnect],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer.types.some((types) => types === 'nodedata')) {
        takeSnapshot();
        try {
          // Extract the data from the drag event and parse it as a JSON object
          const data: { type: string; node?: NodeType } = JSON.parse(
            event.dataTransfer.getData('nodedata'),
          );

          const newId = getNodeId(data.type);

          const newNode: NodeType = {
            id: newId,
            type: data.type,
            position: { x: 0, y: 0 },
            data: {
              ...data.node,
              id: newId,
            },
          };
          paste(
            { nodes: [newNode], edges: [] },
            { x: event.clientX, y: event.clientY },
          );
        } catch (error) {}
      }
    },
    // Specify dependencies for useCallback
    [getNodeId, setNodes, takeSnapshot, paste],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.types.some((types) => types === 'nodedata')) {
      event.dataTransfer.dropEffect = 'move';
    } else {
      event.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  return (
    <div
      style={{ height: '640px', width: '100%' }}
      className={classNames}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnectMod}
        nodeTypes={nodeTypes as any}
        edgeTypes={edgeTypes}
        disableKeyboardA11y={true}
        onDrop={onDrop}
        onDragOver={onDragOver}
        proOptions={{ hideAttribution: true }}
        maxZoom={2}
        minZoom={0.1}
      >
        <Background />
        {miniMap && <FlowController />}
      </ReactFlow>
    </div>
  );
}

export default Flow;
