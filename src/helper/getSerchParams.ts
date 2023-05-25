import { isBrowserContext } from '@helper/isBrowserContext';

export const getSearchParams = (name: string) =>
  isBrowserContext()
    ? new URLSearchParams(location.search).get(name)
    : undefined;
