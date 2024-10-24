import {
  ControlMode,
  NodePanelTypeEnum,
  targetHandleType,
  type NodePanelType,
  type NodeType,
} from '@/interfaces/flow';
import { cleanEdges, getNodeId } from '@/utils/reactflowUtils';
import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  Viewport,
  XYPosition,
} from '@xyflow/react';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { produce } from 'immer';
import { cloneDeep } from 'lodash';
import { create } from 'zustand';
import { useFlowsManagerStore } from './flowsManagerStore';

interface AdjacencyList {
  [key: string]: string[];
}
interface PanePosition extends XYPosition {
  paneX: number;
  paneY: number;
}

export interface FlowStoreType {
  nodes: Node[];
  edges: Edge[];
  initFlow: (graph: { nodes: Node[]; edges: Edge[] }) => {
    nodes: Node[];
    edges: Edge[];
  };

  onEdgesChange: OnEdgesChange;
  onNodesChange: OnNodesChange;

  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (newState: ReactFlowInstance) => void;
  setNodes: (
    update: Node[] | ((oldState: Node[]) => Node[]),
    skipSave?: boolean
  ) => void;
  setEdges: (
    update: Edge[] | ((oldState: Edge[]) => Edge[]),
    skipSave?: boolean
  ) => void;
  setNode: (id: string, update: Node | ((oldState: Node) => Node)) => void;
  getNode: (id: string) => Node | undefined;
  setEdge: (id: string, update: Edge | ((oldState: Edge) => Edge)) => void;
  deleteNode: (nodeId: string | Array<string>) => void;
  deleteEdge: (edgeId: string | Array<string>) => void;
  onConnect: (connection: Connection) => void;
  getFlow: () => { nodes: Node[]; edges: Edge[]; viewport: Viewport };
  paste: (
    selection: { nodes: Node[]; edges: Edge[] },
    position: { x: number; y: number; paneX?: number; paneY?: number }
  ) => void;
  findUpstreamNodes: (id: string) => Node[];
  lastCopiedSelection: { nodes: any; edges: any } | null;
  setLastCopiedSelection: (
    newSelection: { nodes: any; edges: any } | null,
    isCrop?: boolean
  ) => void;
  setNodeFolded: (id: string, folded: boolean) => void;
  nodeLinkMap: Record<string, Node[]>;
  calculateNodeLinkMap: () => void;
  nodePanel: NodePanelType;
  setNodePanel: (panel: NodePanelType) => void;
  controlMode: ControlMode;
  setControlMode: (mode: ControlMode) => void;
  handleNodeEdited: (nodeId: string, cancelEdited?: boolean) => void;
}

export const useFlowStore = create<FlowStoreType>((set, get) => {
  return {
    nodes: [],
    edges: [],
    nodePanel: NodePanelTypeEnum.InNode,
    setNodePanel: (panel: NodePanelType) => {
      set({ nodePanel: panel });
    },
    controlMode:
      localStorage.getItem('ai-workflow-operation-mode') === ControlMode.Pointer
        ? ControlMode.Pointer
        : ControlMode.Hand,
    setControlMode: (mode: ControlMode) => {
      set({ controlMode: mode });
      localStorage.setItem('ai-workflow-operation-mode', mode);
    },
    findUpstreamNodes: (targetNode: string): Node[] => {
      const adjList: AdjacencyList = {};

      get().nodes.forEach((node) => {
        adjList[node.id] = [];
      });
      get().edges.forEach((edge) => {
        adjList[edge.target].push(edge.source);
      });

      const visited = new Set<string>();
      const result = new Set<string>();

      const dfs = (node: string) => {
        if (visited.has(node)) {
          return;
        }
        visited.add(node);

        if (adjList[node]) {
          adjList[node].forEach((upstreamNode) => {
            result.add(upstreamNode);
            dfs(upstreamNode);
          });
        }
      };

      dfs(targetNode);

      return get().nodes.filter((node) => Array.from(result).includes(node.id));
    },
    nodeLinkMap: {},
    calculateNodeLinkMap: () => {
      set({
        nodeLinkMap: get().nodes.reduce((pre, node) => {
          return { ...pre, [node.id]: get().findUpstreamNodes(node.id) };
        }, {}),
      });
    },
    initFlow: (graph: { nodes: Node[]; edges: Edge[] }) => {
      set({
        nodes: graph.nodes,
        edges: graph.edges,
      });
      return {
        nodes: graph.nodes,
        edges: graph.edges,
      };
    },
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
      const newChanges = changes.filter((change) => change.type !== 'position');

      if (newChanges) {
        set({
          nodes: applyNodeChanges(newChanges, get().nodes),
        });
      }
    },
    setNodeFolded: (id: string, folded: boolean) => {
      get().setNode(id, (old: Node) => {
        return {
          ...old,
          data: {
            ...old.data,
            folded,
          },
        };
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },

    setEdge: (id: string, change: Edge | ((oldState: Edge) => Edge)) => {
      const newChange =
        typeof change === 'function'
          ? change(get().edges.find((edge) => edge.id === id)!)
          : change;
      get().setEdges((oldEdges) =>
        oldEdges.map((edge) => {
          if (edge.id === id) {
            // if ((node.data as NodeDataType).node?.frozen) {
            //   (newChange.data as NodeDataType).node!.frozen = false;
            // }
            return newChange;
          }
          return edge;
        })
      );
    },
    setNode: (id: string, change: Node | ((oldState: Node) => Node)) => {
      const newChange =
        typeof change === 'function'
          ? change(get().nodes.find((node) => node.id === id)!)
          : change;
      get().setNodes((oldNodes) =>
        oldNodes.map((node) => {
          if (node.id === id) {
            return newChange;
          }
          return node;
        })
      );
    },
    setNodes: (change) => {
      const newChange =
        typeof change === 'function' ? change(get().nodes) : change;
      const newEdges = cleanEdges(newChange, get().edges);

      set({
        edges: newEdges,
        nodes: newChange,
      });

      const { autoSaveFlow } = useFlowsManagerStore.getState();
      autoSaveFlow?.();
    },
    setEdges: (change) => {
      const newChange =
        typeof change === 'function' ? change(get().edges) : change;
      set({
        edges: newChange,
      });
      // calculate link map
      get().calculateNodeLinkMap();
      // autosave the flow
      const { autoSaveFlow } = useFlowsManagerStore.getState();
      autoSaveFlow?.();
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
            type: 'custom',
          },
          oldEdges
        );

        return newEdges;
      });
    },
    deleteNode: (nodeId) => {
      get().setNodes(
        get().nodes.filter((node) =>
          typeof nodeId === 'string'
            ? node.id !== nodeId
            : !nodeId.includes(node.id)
        )
      );

      get().setEdges(
        get().edges.filter((edge) =>
          typeof nodeId === 'string'
            ? edge.source !== nodeId && edge.target !== nodeId
            : !nodeId.includes(edge.source) && !nodeId.includes(edge.target)
        )
      );
    },

    deleteEdge: (edgeId) => {
      get().setEdges(
        get().edges.filter((edge) =>
          typeof edgeId === 'string'
            ? edge.id !== edgeId
            : !edgeId.includes(edge.id)
        )
      );
    },
    paste: (selection: { nodes: Node[]; edges: Edge[] }, position) => {
      // TODO:页面唯一节点检测
      // if (selection.nodes.some((node) => node.data.type === 'start')) {
      //   useAlertStore.getState().setErrorData({
      //     title: 'Error pasting components',
      //     list: ['You can only have one Start Node in the flow'],
      //   });
      //   return;
      // }

      let minimumX = Infinity;
      let minimumY = Infinity;
      // let idsMap = {};
      let newNodes: Node[] = get().nodes;
      // let newEdges = get().edges;
      selection.nodes.forEach((node: Node) => {
        if (node.position.y < minimumY) {
          minimumY = node.position.y;
        }
        if (node.position.x < minimumX) {
          minimumX = node.position.x;
        }
      });

      const insidePosition = position.paneX
        ? { x: position.paneX + position.x, y: position.paneY + position.y }
        : get().reactFlowInstance!.screenToFlowPosition({
            x: position.x,
            y: position.y,
          });

      selection.nodes.forEach((node: Node) => {
        const newId = getNodeId(node.data['type'] as string);

        const newNode: NodeType = {
          id: newId,
          type: node.data['type'] as string,
          position: {
            x: insidePosition.x + node.position.x - minimumX,
            y: insidePosition.y + node.position.y - minimumY,
          },
          data: {
            ...cloneDeep(node.data),
            id: newId,
          } as any,
        };

        // updateGroupRecursion(
        //   newNode,
        //   selection.edges,
        //   useGlobalVariablesStore.getState().unavaliableFields,
        //   useGlobalVariablesStore.getState().globalVariablesEntries,
        // );

        // Add the new node to the list of nodes in state
        newNodes = newNodes
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .map((node) => ({ ...node, selected: false }))
          .concat({ ...newNode, selected: false });
      });
      get().setNodes(newNodes);

      // selection.edges.forEach((edge: Edge) => {
      //   let source = edge.source;
      //   let target = edge.target;
      //   const sourceHandleObject: sourceHandleType = scapeJSONParse(
      //     edge.sourceHandle!
      //   );
      //   let sourceHandle = scapedJSONStringfy({
      //     ...sourceHandleObject,
      //     id: source,
      //   });
      //   sourceHandleObject.id = source;

      //   edge.data.sourceHandle = sourceHandleObject;
      //   const targetHandleObject: targetHandleType = scapeJSONParse(
      //     edge.targetHandle!
      //   );
      //   let targetHandle = scapedJSONStringfy({
      //     ...targetHandleObject,
      //     id: target,
      //   });
      //   targetHandleObject.id = target;
      //   edge.data.targetHandle = targetHandleObject;
      //   let id = getHandleId(source, sourceHandle, target, targetHandle);
      //   newEdges = addEdge(
      //     {
      //       source,
      //       target,
      //       sourceHandle,
      //       targetHandle,
      //       id,
      //       data: cloneDeep(edge.data),
      //       selected: false,
      //     },
      //     newEdges.map((edge) => ({ ...edge, selected: false }))
      //   );
      // });
      // get().setEdges(newEdges);
    },

    lastCopiedSelection: null,
    setLastCopiedSelection: (newSelection, isCrop = false) => {
      if (isCrop && newSelection) {
        const nodesIdsSelected = newSelection.nodes.map(
          (node: Node) => node.id
        );
        const edgesIdsSelected = newSelection.edges.map(
          (edge: Edge) => edge.id
        );

        nodesIdsSelected.forEach((id: string) => {
          get().deleteNode(id);
        });

        edgesIdsSelected.forEach((id: string) => {
          get().deleteEdge(id);
        });

        const newNodes = get().nodes.filter(
          (node) => !nodesIdsSelected.includes(node.id)
        );
        const newEdges = get().edges.filter(
          (edge) => !edgesIdsSelected.includes(edge.id)
        );

        set({ nodes: newNodes, edges: newEdges });
      }

      set({ lastCopiedSelection: newSelection });
    },

    handleNodeEdited: (nodeId: string, cancelEdited?: boolean) => {
      const newNodes = produce(get().nodes, (draft) => {
        draft.forEach((node) => {
          if (node.id === nodeId) node.data.edited = !cancelEdited;
          else node.data.edited = false;
        });
      });
      get().setNodes(newNodes);
    },
  };
});
