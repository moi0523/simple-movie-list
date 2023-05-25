import { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { useEvent, useMount } from 'react-use';
import { styletron } from '@style/styletron';
import { calculateAlternativeViewportUnit } from '@style/mixin';
import { QueryClient } from '@tanstack/query-core';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { debounce } from 'lodash';
import { WithErrorBoundary } from '@HOC/withErrorBoundary';
import { WithThemeProvider } from '@HOC/withThemeProvider';
import { DefaultGetStaticProps } from '@type/next-shared.types';
import { AppFallback } from '@component/organisms/errorBoundary/AppFallback';

const debouncedCalculateAlternativeViewportUnit = debounce(
  calculateAlternativeViewportUnit,
  600,
);

function CustomApp({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps<DefaultGetStaticProps>) {
  const [queryClient] = useState(() => new QueryClient());

  useMount(calculateAlternativeViewportUnit);

  useEvent('resize', debouncedCalculateAlternativeViewportUnit);

  return (
    <StyletronProvider value={styletron}>
      <RecoilRoot>
        <WithErrorBoundary FallbackComponent={AppFallback}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
              <WithThemeProvider>
                <Component {...pageProps} />
              </WithThemeProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </WithErrorBoundary>
      </RecoilRoot>
    </StyletronProvider>
  );
}

export default CustomApp;
