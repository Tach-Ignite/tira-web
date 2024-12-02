import React from 'react';

import { customRender } from './utils';
import Page from '../src/app/page';

describe('Page', () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  it('should render successfully ', () => {
    const { baseElement } = customRender(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
