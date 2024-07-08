import { Button, theme, type ButtonProps, type GlobalToken } from 'antd';
import React, { type FC, type ReactNode } from 'react';
import styled from 'styled-components';

//////////////////////////////// 阅读后请移除该注释 /////////////////////////////////
// 请注意：当前模板为 antd v5 + CSS-in-JS 的方案                                    //
// 如果你需要研发的是 antd v4 + 传统 CSS 方案的组件库，请参考文档调整构建配置及研发方式：   //
// https://bigfish.antgroup-inc.cn/best-pract/library/based-on-antd#基于-antd-v4 //
//////////////////////////////// 阅读后请移除该注释 /////////////////////////////////

const { useToken } = theme;
const FooButton = styled(Button).attrs(() => ({ $token: useToken().token }))<{
  $token?: GlobalToken;
}>`
  color: ${(props) => props.$token!.colorError};

  && {
    font-size: ${(props) => (props.size === 'large' ? '30px' : '20px')};
  }
`;

export interface FooProps {
  size: ButtonProps['size'];
  children?: ReactNode;
}

const Foo: FC<FooProps> = ({ size, children }) => {
  return (
    <FooButton size={size} className="button">
      {children}
    </FooButton>
  );
};

export default Foo;
