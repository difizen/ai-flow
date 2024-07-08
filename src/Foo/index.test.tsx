import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Foo from './index';

describe('<Foo />', function () {
  it('render Foo with bigfish', () => {
    const msg = 'bigfish';

    render(<Foo>{msg}</Foo>);
    expect(screen.queryByText('bigfish')).toBeInTheDocument();
  });
});
