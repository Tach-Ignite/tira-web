import React from 'react';

import { customRender } from './utils';
import Page from '../src/app/page';

describe('Page', () => {
  it('should render successfully ', () => {
    const { baseElement } = customRender(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
