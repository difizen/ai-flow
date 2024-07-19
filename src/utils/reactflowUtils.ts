import { Edge } from '@xyflow/react';
import { cloneDeep } from 'lodash';

export function cleanEdges(nodes: any[], edges: Edge[]) {
  let newEdges = cloneDeep(edges);

  return newEdges;
}
