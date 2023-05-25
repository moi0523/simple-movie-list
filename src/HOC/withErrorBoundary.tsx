import { ReactNode } from 'react';
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
} from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

interface WithErrorBoundaryProps extends ErrorBoundaryPropsWithComponent {
  children: ReactNode;
}

const WithErrorBoundary = (props: WithErrorBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => <ErrorBoundary onReset={reset} {...props} />}
  </QueryErrorResetBoundary>
);

export { WithErrorBoundary };
export type { WithErrorBoundaryProps };
