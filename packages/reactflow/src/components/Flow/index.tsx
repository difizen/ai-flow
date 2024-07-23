import { CustomBaseNode } from '@/components/Node/CustomBaseNode';

import { useFlowStore } from '@/stores/useFlowStore';
import { useShortcutsStore } from '@/stores/useShortcutsStore';
import { useUndoRedoStore } from '@/stores/useUndoRedoStore';
import {
  Background,
  Controls,
  MiniMap,
  OnSelectionChangeParams,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
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
  genericNode: CustomBaseNode,
};

interface FlowProps {
  miniMap?: boolean;
  classNames?: string;
}

function Flow(props: FlowProps) {
  const { miniMap, classNames } = props;
  const position = useRef({ x: 0, y: 0 });
  const [lastSelection, setLastSelection] =
    useState<OnSelectionChangeParams | null>(null);

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const setNodes = useFlowStore((state) => state.setNodes);
  const reactFlowInstance = useFlowStore((state) => state.reactFlowInstance);
  const setReactFlowInstance = useFlowStore(
    (state) => state.setReactFlowInstance,
  );
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);

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

  useEffect(() => {
    const nodes = [
      {
        id: 'node-1',
        type: 'genericNode',
        data: { name: 'Node 1' },
        position: { x: 250, y: 50 },
      },
      {
        id: 'node-2',
        type: 'genericNode',
        data: { name: 'Node 2' },
        position: { x: 250, y: 550 },
      },
    ];
    setNodes(nodes);
  }, []);

  useEffect(() => {
    reactFlowInstance?.fitView();
  }, [reactFlowInstance]);

  const onConnectMod = () => {};
  return (
    <div style={{ height: '640px', width: '100%' }} className={classNames}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnectMod}
        nodeTypes={nodeTypes as any}
        disableKeyboardA11y={true}
      >
        <Background />
        {miniMap && <MiniMap />}
        <Controls></Controls>
      </ReactFlow>
    </div>
  );
}

export default Flow;
