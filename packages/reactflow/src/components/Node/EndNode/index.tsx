import type { NodeType } from '@/interfaces/flow';
import { memo } from 'react';

import React from 'react';
import { NodeWrapper } from '../NodeWrapper/index';

const EndNode = (props: NodeType) => {
  // return <div className="bg-blue-300 w-10 h-10">hi</div>;
  return <NodeWrapper nodeProps={props} rightHandler={false}></NodeWrapper>;
};

export default memo(EndNode);
