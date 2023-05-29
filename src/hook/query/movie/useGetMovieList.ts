import { MOVIE_QUERIES } from '@hook/query/movie/movie.queries';
import { API } from '@service/api';
import { UseInfiniteQueryOptions } from '@tanstack/react-query/src/types';
import { QueryFunctionContext } from '@tanstack/query-core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieItemType } from '@type/movie/movieItem';

type FetchMovieListResponse = {
  results: MovieItemType[];
};

type UseInfiniteQueryGeneric = {
  TQueryFnData: Awaited<ReturnType<typeof fetchMovieList>>;
  TError: Error;
  TData: UseInfiniteQueryGeneric['TQueryFnData'];
  TQueryData: UseInfiniteQueryGeneric['TQueryFnData'];
  TQueryKey: ReturnType<typeof MOVIE_QUERIES.MOVIE_LIST>;
};

const fetchMovieList = async ({
  pageParam = 1,
  queryKey: [{ endPoint }],
}: QueryFunctionContext<UseInfiniteQueryGeneric['TQueryKey']>) =>
  (
    await API.get(endPoint, {
      searchParams: {
        language: 'ko',
        page: pageParam,
      },
    }).json<FetchMovieListResponse>()
  ).results;

const useMovieListQuery = <QueryReturnType = UseInfiniteQueryGeneric['TData']>(
  options?: Omit<
    UseInfiniteQueryOptions<
      UseInfiniteQueryGeneric['TQueryFnData'],
      UseInfiniteQueryGeneric['TError'],
      QueryReturnType,
      UseInfiniteQueryGeneric['TQueryData'],
      UseInfiniteQueryGeneric['TQueryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useInfiniteQuery<
    UseInfiniteQueryGeneric['TQueryFnData'],
    UseInfiniteQueryGeneric['TError'],
    QueryReturnType,
    UseInfiniteQueryGeneric['TQueryKey']
  >(MOVIE_QUERIES.MOVIE_LIST(), fetchMovieList, {
    ...options,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });

export { fetchMovieList, useMovieListQuery };
export type { FetchMovieListResponse };
