import {MOVIE_QUERIES} from '@hook/query/movie/movie.queries';
import {API} from '@service/api';
import {UseInfiniteQueryOptions} from '@tanstack/react-query/src/types';
import {QueryFunctionContext} from '@tanstack/query-core';
import {useInfiniteQuery} from '@tanstack/react-query';
import {MovieItemType} from '@type/movie/movieItem';

type FetchMovieListResponse = {
  page: number;
  results: MovieItemType[];
};

type UseInfiniteQueryGeneric = {
  TQueryFnData: Awaited<ReturnType<typeof fetchMovieList>>;
  TError: Error;
  TData: UseInfiniteQueryGeneric['TQueryFnData'];
  TQueryKey: ReturnType<typeof MOVIE_QUERIES.MOVIE_LIST>;
};

const fetchMovieList = async ({
  pageParam = 1,
}: QueryFunctionContext<UseInfiniteQueryGeneric['TQueryKey']>) => {
  const { results } = await API.get(
    `discover/movie?language=ko&page=${pageParam}`,
  ).json<FetchMovieListResponse>();

  return {
    data: results,
  };
};

const useMovieListQuery = (
  options?: Omit<
    UseInfiniteQueryOptions<
      UseInfiniteQueryGeneric['TQueryFnData'],
      UseInfiniteQueryGeneric['TError'],
      UseInfiniteQueryGeneric['TData'],
      UseInfiniteQueryGeneric['TQueryFnData'],
      UseInfiniteQueryGeneric['TQueryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useInfiniteQuery<
    UseInfiniteQueryGeneric['TQueryFnData'],
    UseInfiniteQueryGeneric['TError'],
    UseInfiniteQueryGeneric['TQueryFnData'],
    UseInfiniteQueryGeneric['TQueryKey']
  >(MOVIE_QUERIES.MOVIE_LIST(), fetchMovieList, options);

export { fetchMovieList, useMovieListQuery };
export type { FetchMovieListResponse };
