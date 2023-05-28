import { MOVIE_QUERIES } from '@hook/query/movie/movie.queries';
import { API } from '@service/api';
import { UseInfiniteQueryOptions } from '@tanstack/react-query/src/types';
import { QueryFunctionContext } from '@tanstack/query-core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieItemType } from '@type/movie/movieItem';

type FetchMovieListResponse = {
  page: number;
  results: MovieItemType[];
};

type UseQueryGeneric = {
  TQueryFnData: Awaited<ReturnType<typeof fetchMovieList>>;
  TError: Error;
  TData: UseQueryGeneric['TQueryFnData'];
  TQueryData: UseQueryGeneric['TQueryFnData'];
  TQueryKey: ReturnType<typeof MOVIE_QUERIES.MOVIE_LIST>;
};

const fetchMovieList = async ({
  pageParam = 1,
  queryKey: [{ endPoint }],
}: QueryFunctionContext<UseQueryGeneric['TQueryKey']>) =>
  (
    await API.get(endPoint, {
      searchParams: {
        language: 'ko',
        page: pageParam,
      },
    }).json<FetchMovieListResponse>()
  ).results;

const useMovieListQuery = <QueryReturnType = UseQueryGeneric['TData']>(
  options?: Omit<
    UseInfiniteQueryOptions<
      UseQueryGeneric['TQueryFnData'],
      UseQueryGeneric['TError'],
      QueryReturnType,
      UseQueryGeneric['TQueryData'],
      UseQueryGeneric['TQueryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useInfiniteQuery<
    UseQueryGeneric['TQueryFnData'],
    UseQueryGeneric['TError'],
    QueryReturnType,
    UseQueryGeneric['TQueryKey']
  >(MOVIE_QUERIES.MOVIE_LIST(), fetchMovieList, {
    ...options,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });

export { fetchMovieList, useMovieListQuery };
export type { FetchMovieListResponse };
