import React, { ReactElement, ComponentProps, FunctionComponent } from 'react';
import { render } from '@testing-library/react';
import ReactQueryProvider from '../src/app/QueryProvider';

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}

export function customRender(
  ui: ReactElement<ComponentProps<FunctionComponent>>,
  options?: object,
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}
