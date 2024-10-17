import {
  ControlMode,
  type NodeDataType,
  type NodeType,
} from '@/interfaces/flow';
import { useFlowsManagerStore } from '@/stores/flowsManagerStore';
import { useFlowStore } from '@/stores/flowStore';
import { useShortcutsStore } from '@/stores/useShortcutsStore';
import { getNodeId } from '@/utils/reactflowUtils';
import isWrappedWithClass from '@/utils/wrappedClass';
import type {
  Connection,
  Edge,
  OnSelectionChangeParams,
  SelectionDragHandler,
} from '@xyflow/react';
import { Background, MiniMap, ReactFlow } from '@xyflow/react';
import _ from 'lodash';
import React, {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import CustomConnectionLine from '../CustomEdge/costom-connection-line';

import CustomEdge from '../CustomEdge/index';
import { Operator } from '../FlowController/operator';

import { EventEmitterContextProvider } from '@/context/event-emitter';
import { useNodeInteractions } from '@/stores/nodeInteractions';
import '@xyflow/react/dist/style.css';
import { Header } from '../Header';
import HelpLine from '../HelpLine';
import { NodeComponentMap } from '../Node';
import { Panel } from '../Panel';

const edgeTypes = {
  custom: CustomEdge,
};

interface FlowProps {
  classNames?: string;
  /** show flow mini map */
  miniMap?: boolean;
  /** node types */
  nodeTypes?: Record<string, ComponentType<any>>;
  /** toolbar in flow*/
  toolbar: React.ReactNode;
  /** initial graph */
  initialGraph?: {
    nodes: NodeType[];
    edges: Edge[];
  };

  /** Auto save function */
  onAutoSave?: () => Promise<void>;
}

function Flow(props: FlowProps) {
  const {
    miniMap = true,
    classNames,
    nodeTypes = NodeComponentMap,
    initialGraph,
    toolbar,
  } = props;
  const position = useRef({ x: 0, y: 0 });
  const [lastSelection, setLastSelection] =
    useState<OnSelectionChangeParams | null>(null);

  const controlMode = useFlowStore((state) => state.controlMode);
  const nodes = useFlowStore((state) => state.nodes);
  const handleNodeEdited = useFlowStore((state) => state.handleNodeEdited);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const initFlow = useFlowStore((state) => state.initFlow);

  const onNodeDrag = useNodeInteractions((state) => state.onNodeDrag);
  const onNodeDragEnd = useNodeInteractions((state) => state.onNodeDragEnd);

  const setReactFlowInstance = useFlowStore(
    (state) => state.setReactFlowInstance,
  );
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);
  const onConnect = useFlowStore((state) => state.onConnect);

  const setLastCopiedSelection = useFlowStore(
    (state) => state.setLastCopiedSelection,
  );
  const lastCopiedSelection = useFlowStore(
    (state) => state.lastCopiedSelection,
  );
  const paste = useFlowStore((state) => state.paste);
  const undo = useFlowsManagerStore((state) => state.undo);
  const redo = useFlowsManagerStore((state) => state.redo);
  const takeSnapshot = useFlowsManagerStore((state) => state.takeSnapshot);

  // Hot keys
  const undoAction = useShortcutsStore((state) => state.undo);
  const redoAction = useShortcutsStore((state) => state.redo);
  const copyAction = useShortcutsStore((state) => state.copy);
  const duplicate = useShortcutsStore((state) => state.duplicate);
  const deleteAction = useShortcutsStore((state) => state.delete);
  const cutAction = useShortcutsStore((state) => state.cut);
  const pasteAction = useShortcutsStore((state) => state.paste);

  function handleUndo(e: KeyboardEvent) {
    if (!isWrappedWithClass(e, 'noflow')) {
      e.preventDefault();
      (e as unknown as Event).stopImmediatePropagation();
      undo();
    }
  }

  function handleRedo(e: KeyboardEvent) {
    if (!isWrappedWithClass(e, 'noflow')) {
      e.preventDefault();
      (e as unknown as Event).stopImmediatePropagation();
      redo();
    }
  }

  function handleDuplicate(e: KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    (e as unknown as Event).stopImmediatePropagation();
    const selectedNode = nodes.filter((obj) => obj.selected);
    if (selectedNode.length > 0) {
      paste(
        { nodes: selectedNode, edges: [] },
        {
          x: position.current.x,
          y: position.current.y,
        },
      );
    }
  }

  function handleCopy(e: KeyboardEvent) {
    const multipleSelection = lastSelection?.nodes
      ? lastSelection?.nodes.length > 0
      : false;
    if (
      !isWrappedWithClass(e, 'noflow') &&
      (isWrappedWithClass(e, 'react-flow__node') || multipleSelection)
    ) {
      e.preventDefault();
      (e as unknown as Event).stopImmediatePropagation();
      if (window.getSelection()?.toString().length === 0 && lastSelection) {
        setLastCopiedSelection(_.cloneDeep(lastSelection));
      }
    }
  }

  function handleCut(e: KeyboardEvent) {
    if (!isWrappedWithClass(e, 'noflow')) {
      e.preventDefault();
      (e as unknown as Event).stopImmediatePropagation();
      if (window.getSelection()?.toString().length === 0 && lastSelection) {
        setLastCopiedSelection(_.cloneDeep(lastSelection), true);
      }
    }
  }

  function handlePaste(e: KeyboardEvent) {
    if (!isWrappedWithClass(e, 'noflow')) {
      e.preventDefault();
      (e as unknown as Event).stopImmediatePropagation();
      if (
        window.getSelection()?.toString().length === 0 &&
        lastCopiedSelection
      ) {
        takeSnapshot();
        paste(lastCopiedSelection, {
          x: position.current.x,
          y: position.current.y,
        });
      }
    }
  }

  function handleDelete(e: KeyboardEvent) {
    if (!isWrappedWithClass(e, 'nodelete') && lastSelection) {
      e.preventDefault();
      (e as unknown as Event).stopImmediatePropagation();
      takeSnapshot();
      deleteNode(lastSelection.nodes.map((node) => node.id));
      deleteEdge(lastSelection.edges.map((edge) => edge.id));
    }
  }

  useHotkeys(undoAction, handleUndo);
  useHotkeys(redoAction, handleRedo);
  useHotkeys(duplicate, handleDuplicate);
  useHotkeys(copyAction, handleCopy);
  useHotkeys(cutAction, handleCut);
  useHotkeys(pasteAction, handlePaste);
  useHotkeys(deleteAction, handleDelete);
  useHotkeys('delete', handleDelete);

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
              folded: false,
            } as NodeDataType,
          };
          paste(
            { nodes: [newNode], edges: [] },
            { x: event.clientX, y: event.clientY },
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
    // Specify dependencies for useCallback
    [takeSnapshot, paste],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.types.some((types) => types === 'nodedata')) {
      event.dataTransfer.dropEffect = 'move';
    } else {
      event.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const onNodeDragStart = useCallback(() => {
    // 👇 make dragging a node undoable
    takeSnapshot();
    // 👉 you can place your event handlers here
  }, [takeSnapshot]);

  const onSelectionChange = useCallback(
    (flow: OnSelectionChangeParams): void => {
      setLastSelection(flow);
    },
    [],
  );

  const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
    // 👇 make dragging a selection undoable
    takeSnapshot();
  }, [takeSnapshot]);

  // get current mouse position for paste node
  useEffect(() => {
    const handleMouseMove = (event) => {
      position.current = { x: event.clientX, y: event.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastCopiedSelection, lastSelection, takeSnapshot]);

  const autoSaving = useFlowsManagerStore((state) => state.autoSaving);
  const initializeAutoSaveFlow = useFlowsManagerStore(
    (state) => state.initializeAutoSaveFlow,
  );
  useEffect(() => {
    if (initialGraph) {
      initFlow(initialGraph);
    }
    if (autoSaving) {
      initializeAutoSaveFlow();
    }
  }, []);

  return (
    <EventEmitterContextProvider>
      <div style={{ height: '100%', width: '100%' }} className={classNames}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onInit={setReactFlowInstance}
          onNodesChange={onNodesChange}
          onNodeDrag={(_, node) => onNodeDrag(node)}
          onNodeDragStop={(_, node) => onNodeDragEnd(node)}
          onEdgesChange={onEdgesChange}
          onNodeDragStart={onNodeDragStart}
          onSelectionChange={onSelectionChange}
          onSelectionDragStart={onSelectionDragStart}
          onConnect={onConnectMod}
          onNodeClick={(_, node) => handleNodeEdited(node.id)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          disableKeyboardA11y={true}
          connectionLineComponent={CustomConnectionLine}
          onDrop={onDrop}
          onDragOver={onDragOver}
          maxZoom={2}
          minZoom={0.1}
          panOnDrag={controlMode === ControlMode.Hand}
          selectionOnDrag={controlMode === ControlMode.Pointer}
          fitView
        >
          <Background gap={[14, 14]} size={2} color="#E4E5E7" />
          {miniMap && (
            <MiniMap
              style={{
                width: 102,
                height: 72,
              }}
              className="!absolute !left-4 !bottom-14 z-[9] !m-0 !w-[102px] !h-[72px] !border-[0.5px] !border-black/8 !rounded-lg !shadow-lg"
            />
          )}
          <Operator />
          <Panel className={toolbar ? '' : 'top-2'} />
          <Header toolbar={toolbar} />
          <HelpLine />
        </ReactFlow>
      </div>
    </EventEmitterContextProvider>
  );
}

export default Flow;
