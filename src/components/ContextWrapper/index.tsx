import { EventEmitterContextProvider } from '@/context/event-emitter';
import { ReactFlowProvider } from '@xyflow/react';
import type { ReactNode } from 'react';

export const ContextWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <EventEmitterContextProvider>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </EventEmitterContextProvider>
  );
};
