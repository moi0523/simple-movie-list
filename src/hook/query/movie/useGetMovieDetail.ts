import { MOVIE_QUERIES } from '@hook/query/movie/movie.queries';
import { API } from '@service/api';
import { QueryFunctionContext } from '@tanstack/query-core';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MovieDetailType } from '@type/movie/movieDetail';

type FetchMovieDetailResponse = MovieDetailType;

type UseQueryGeneric = {
  TQueryFnData: Awaited<ReturnType<typeof fetchGetMovieDetail>>;
  TError: Error;
  TData: UseQueryGeneric['TQueryFnData'];
  TQueryKey: ReturnType<typeof MOVIE_QUERIES.MOVIE_DETAIL>;
};

const fetchGetMovieDetail = async ({
  queryKey: [{ endPoint }],
}: QueryFunctionContext<UseQueryGeneric['TQueryKey']>) =>
  await API.get(endPoint, {
    searchParams: {
      language: 'ko',
    },
  }).json<FetchMovieDetailResponse>();

const useGetMovieDetailQuery = (
  id: number,
  options?: Omit<
    UseQueryOptions<
      UseQueryGeneric['TQueryFnData'],
      UseQueryGeneric['TError'],
      UseQueryGeneric['TData'],
      UseQueryGeneric['TQueryKey']
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<
    UseQueryGeneric['TQueryFnData'],
    UseQueryGeneric['TError'],
    UseQueryGeneric['TData'],
    UseQueryGeneric['TQueryKey']
  >(MOVIE_QUERIES.MOVIE_DETAIL(id), fetchGetMovieDetail, options);

export { fetchGetMovieDetail, useGetMovieDetailQuery };
export type { FetchMovieDetailResponse };
