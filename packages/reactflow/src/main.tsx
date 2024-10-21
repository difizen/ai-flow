import * as ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import React from 'react';
import { FlowWithPanel } from './blocks/flowWithPanel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <FlowWithPanel />
  </StrictMode>
);
