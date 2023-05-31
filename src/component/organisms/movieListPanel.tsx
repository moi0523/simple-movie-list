import { useStyletron } from 'styletron-react';
import { useMovieListQuery } from '@hook/query/movie/useGetMovieList';
import { InfiniteGridView } from '@component/molecules/view/infiniteGridView';
import { MovieItemType } from '@type/movie/movieItem';
import { MovieItem } from '@component/molecules/item/movieItem';
import { movieListInfoState } from '@store/movieListInfo/movieListInfoState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const MovieListPanel = () => {
  const [css] = useStyletron();
  const {
    data: movieListData,
    fetchNextPage,
    status,
  } = useMovieListQuery({
    refetchOnWindowFocus: false,
  });
  const setMovieList = useSetRecoilState(movieListInfoState);

  useEffect(() => {
    if (movieListData) {
      setMovieList(movieListData);
    }
  }, [movieListData]);

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      {status === 'success' && (
        <InfiniteGridView<MovieItemType>
          data={movieListData}
          columnCount={5}
          columnGap="24px"
          rowGap="32px"
          fetchNextPage={fetchNextPage}
          renderContent={(props, index) => (
            <MovieItem {...props} key={`movie-item-${index}`} />
          )}
        />
      )}
    </article>
  );
};

export { MovieListPanel };
