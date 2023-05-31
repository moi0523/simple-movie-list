import { atom } from 'recoil';
import { MOVIE_LIST_STATES } from '@store/movieListInfo/movie.states';
import { InfiniteData } from '@tanstack/query-core/src/types';
import { MovieItemType } from '@type/movie/movieItem';

const movieListInfoState = atom<InfiniteData<MovieItemType[]>>({
  key: MOVIE_LIST_STATES.movieList,
  default: undefined,
});

export { movieListInfoState };
