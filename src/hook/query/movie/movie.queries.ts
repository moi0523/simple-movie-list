export const MOVIE_QUERIES = {
  SCOPE: [{ scope: 'MOVIE' }] as const,
  MOVIE_LIST: () =>
    [
      {
        ...MOVIE_QUERIES.SCOPE[0],
        entity: 'movie_list',
        endPoint: 'discover/movie',
      },
    ] as const,
  MOVIE_DETAIL: (id: number) =>
    [
      {
        ...MOVIE_QUERIES.SCOPE[0],
        entity: 'movie_detail',
        endPoint: `movie/${id}`,
      },
    ] as const,
  SEARCH_MOVIE: (searchKeyword: string) =>
    [
      {
        ...MOVIE_QUERIES.SCOPE[0],
        entity: 'search_movie',
        queryString: `searchKeyword=${searchKeyword}`,
      },
    ] as const,
};
