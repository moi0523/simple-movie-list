import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { movieListInfoState } from '@store/movieListInfo/movieListInfoState';

const useSearchMovie = () => {
  const [value, setValue] = useState<string>('');
  const movieList = useRecoilValue(movieListInfoState);

  const setSearchValue = (searchValue: string) => {
    setValue(searchValue);
  };

  const getSearchList = useCallback(() => {
    if (!movieList || !value) {
      return [];
    }

    const flatMovieList = movieList?.pages?.flat();

    return flatMovieList?.filter((movie) => {
      return (
        movie.title.includes(value) ||
        movie.original_title.toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [value, movieList]);

  return {
    value,
    setSearchValue,
    getSearchList,
  };
};

export { useSearchMovie };
