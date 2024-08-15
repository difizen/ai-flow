import { NodeDataType } from '@/interfaces/flow';
import { classNames } from '@/utils';
import { Handle, Position } from '@xyflow/react';
import { Space, Tooltip } from 'antd';
import React from 'react';

type Props = {
  data: NodeDataType;
  selected: boolean;
  xPos: number;
  yPos: number;
};

export const NodeWrapper = (props: {
  nodeProps: Props;
  children: React.ReactElement;
  leftHandler?: boolean;
  rightHandler?: boolean;
}) => {
  const {
    nodeProps,
    children,
    leftHandler = true,
    rightHandler = true,
  } = props;
  const { nodeMeta } = nodeProps.data;

  const runRes = {};
  const validationStatus = true;
  const selected = false;
  return (
    <div
      // style={{
      //   border: `1px solid ${
      //     selected ? `hsl(var(--ring))` : `hsl(var(--border))`
      //   }`,
      // }}
      className={classNames(
        'relative flex flex-col justify-center rounded-xl bg-white border-2',
        selected ? 'border-sky-500' : '',
      )}
    >
      {/* <NodeStatus status={'success' as any} runDuration={1020} /> */}
      <div className="flex w-full items-center justify-between gap-8 rounded-t-lg border-b bg-muted p-4">
        <Space className="text-lg">
          <img src={nodeMeta.icon} className="h-10 rounded p-1" />
          <div className="ml-2 truncate text-gray-800">{nodeMeta.title}</div>
        </Space>

        {/*  TODO:这里用来展示运行状态运行信息 */}
        <div className="flex gap-3">
          <div>
            <Tooltip
              title={
                !validationStatus ? (
                  'Validating...'
                ) : (
                  <></>
                  // <div className="max-h-96 overflow-auto">
                  //   {validationStatus.params ||
                  //     ''
                  //       .split('\n')
                  //       .map((line, index) => <div key={index}>{line}</div>)}
                  // </div>
                )
              }
            >
              <div className="w-5 h-5 relative top-[3px]">
                <div
                  className={classNames(
                    runRes && validationStatus
                      ? 'w-4 h-4 rounded-full bg-green-500 opacity-100'
                      : 'w-4 h-4 rounded-full bg-gray-500 opacity-0 hidden animate-spin',
                    'absolute w-4 hover:text-gray-500 transition-all ease-in-out duration-200',
                  )}
                ></div>
                <div
                  className={classNames(
                    validationStatus && !runRes
                      ? 'w-4 h-4 rounded-full  bg-red-500 opacity-100'
                      : 'w-4 h-4 rounded-full bg-gray-500 opacity-0 hidden animate-spin',
                    'absolute w-4 hover:text-gray-500 transition-all ease-in-out duration-200',
                  )}
                ></div>
                <div
                  className={classNames(
                    !validationStatus
                      ? 'w-4 h-4 rounded-full  bg-yellow-500 opacity-100'
                      : 'w-4 h-4 rounded-full bg-gray-500 opacity-0 hidden animate-spin',
                    'absolute w-4 hover:text-gray-500 transition-all ease-in-out duration-200',
                  )}
                ></div>
              </div>
            </Tooltip>
          </div>
        </div>
        {/* TODO:这里用来展示运行状态运行信息 */}
      </div>
      {leftHandler && (
        <Handle
          type="source"
          position={Position.Left}
          style={{ borderColor: 'rgb(59 130 246)' }}
          className={classNames(
            '-ml-0.5 ',
            'w-3 h-3 rounded-full border-2 bg-white',
          )}
        />
      )}
      {rightHandler && (
        <Handle
          type="target"
          position={Position.Right}
          style={{ borderColor: 'rgb(59 130 246)' }}
          className={classNames(
            '-mr-0.5 ',
            'w-3 h-3 rounded-full border-2 bg-white',
          )}
        />
      )}

      {/* <NodeHeader name={data.nodeMeta.title} icon={<ApiTwoTone />} /> */}
      <div className="h-full w-full py-5 text-gray-400">
        <div className="w-full px-5 pb-3 text-sm text-muted-foreground">
          {nodeMeta?.description}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};
