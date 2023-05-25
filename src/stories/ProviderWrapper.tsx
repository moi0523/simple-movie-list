import { ReactNode, useState } from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { AppFallback } from '@component/organisms/errorBoundary/AppFallback';
import { styletron } from '@style/styletron';
import { WithErrorBoundary } from '@HOC/withErrorBoundary';
import { WithThemeProvider } from '@HOC/withThemeProvider';

interface StoriesProviderWrapperProps {
  children?: ReactNode;
}

const StoriesProviderWrapper = ({ children }: StoriesProviderWrapperProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StyletronProvider value={styletron}>
      <RecoilRoot>
        <WithErrorBoundary FallbackComponent={AppFallback}>
          <QueryClientProvider client={queryClient}>
            <WithThemeProvider>{children}</WithThemeProvider>
          </QueryClientProvider>
        </WithErrorBoundary>
      </RecoilRoot>
    </StyletronProvider>
  );
};

export { StoriesProviderWrapper };
