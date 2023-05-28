import {useStyletron} from 'styletron-react';
import {useMovieListQuery} from '@hook/query/movie/useGetMovieList';
import {InfiniteGridView} from '@component/molecules/view/infiniteGridView';
import {MovieItemType} from '@type/movie/movieItem';
import {MovieItem} from '@component/molecules/item/movieItem';

const MovieListPanel = () => {
  const [css] = useStyletron();
  const {
    data: movieListData,
    // refetch,
    // ,
    // isFetching,
    status,
  } = useMovieListQuery();

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {status === 'success' && (
        <InfiniteGridView<MovieItemType>
          data={movieListData}
          columnCount={5}
          columnGap="24px"
          rowGap="32px"
          renderContent={(props, index) => (
            <MovieItem {...props} key={`movie-item-${index}`} />
          )}
        />
      )}
    </article>
  );
};

export { MovieListPanel };
