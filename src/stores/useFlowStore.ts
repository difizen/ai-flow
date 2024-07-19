import { cleanEdges } from '@/utils/reactflowUtils';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  Viewport,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import { create } from 'zustand';

interface FlowStoreType {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (newState: ReactFlowInstance) => void;
  setNodes: (
    update: Node[] | ((oldState: Node[]) => Node[]),
    skipSave?: boolean,
  ) => void;
  setEdges: (
    update: Edge[] | ((oldState: Edge[]) => Edge[]),
    skipSave?: boolean,
  ) => void;
  setNode: (id: string, update: Node | ((oldState: Node) => Node)) => void;
  getNode: (id: string) => Node | undefined;
  deleteNode: (nodeId: string | Array<string>) => void;
  deleteEdge: (edgeId: string | Array<string>) => void;
  onConnect: (connection: Connection) => void;
  getFlow: () => { nodes: Node[]; edges: Edge[]; viewport: Viewport };
  paste: any;
}

export const useFlowStore = create<FlowStoreType>((set, get) => ({
  nodes: [],
  edges: [],
  reactFlowInstance: null,
  setReactFlowInstance: (newState) => {
    set({ reactFlowInstance: newState });
  },
  getFlow: () => {
    return {
      nodes: get().nodes,
      edges: get().edges,
      viewport: get().reactFlowInstance?.getViewport() ?? {
        x: 0,
        y: 0,
        zoom: 1,
      },
    };
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  setNode: (id: string, change: Node | ((oldState: Node) => Node)) => {
    let newChange =
      typeof change === 'function'
        ? change(get().nodes.find((node) => node.id === id)!)
        : change;
    get().setNodes((oldNodes) =>
      oldNodes.map((node) => {
        if (node.id === id) {
          // if ((node.data as NodeDataType).node?.frozen) {
          //   (newChange.data as NodeDataType).node!.frozen = false;
          // }
          return newChange;
        }
        return node;
      }),
    );
  },
  setNodes: (change) => {
    let newChange = typeof change === 'function' ? change(get().nodes) : change;
    let newEdges = cleanEdges(newChange, get().edges);
    // const { inputs, outputs } = getInputsAndOutputs(newChange);

    set({
      edges: newEdges,
      nodes: newChange,
      // flowState: undefined,
      // inputs,
      // outputs,
      // hasIO: inputs.length > 0 || outputs.length > 0,
    });

    // const flowsManager = useFlowsManagerStore.getState();
    // if (!get().isBuilding && !skipSave && get().onFlowPage) {
    //   flowsManager.autoSaveCurrentFlow(
    //     newChange,
    //     newEdges,
    //     get().reactFlowInstance?.getViewport() ?? { x: 0, y: 0, zoom: 1 },
    //   );
    // }
  },

  setEdges: (change) => {
    let newChange = typeof change === 'function' ? change(get().edges) : change;
    set({
      edges: newChange,
      // flowState: undefined,
    });

    // const flowsManager = useFlowsManagerStore.getState();
    // if (!get().isBuilding && !skipSave && get().onFlowPage) {
    //   flowsManager.autoSaveCurrentFlow(
    //     get().nodes,
    //     newChange,
    //     get().reactFlowInstance?.getViewport() ?? { x: 0, y: 0, zoom: 1 },
    //   );
    // }
  },
  getNode: (id: string) => {
    return get().nodes.find((node) => node.id === id);
  },

  onConnect: (connection) => {
    let newEdges: Edge[] = [];
    get().setEdges((oldEdges) => {
      newEdges = addEdge(
        {
          ...connection,
          data: {
            targetHandle: connection.targetHandle!,
            sourceHandle: connection.sourceHandle!,
          },
          // style: { stroke: "#555" },
          // className: "stroke-foreground stroke-connection",
        },
        oldEdges,
      );

      return newEdges;
    });
  },
  deleteNode: (nodeId) => {
    get().setNodes(
      get().nodes.filter((node) =>
        typeof nodeId === 'string'
          ? node.id !== nodeId
          : !nodeId.includes(node.id),
      ),
    );
  },
  deleteEdge: (edgeId) => {
    get().setEdges(
      get().edges.filter((edge) =>
        typeof edgeId === 'string'
          ? edge.id !== edgeId
          : !edgeId.includes(edge.id),
      ),
    );
  },
  paste: () => {
    console.log('🚀 ~ useFlowStore ~ paste:');
  },
}));
