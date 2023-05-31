import { GetStaticProps, NextPage } from 'next';
import { useStyletron } from 'styletron-react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import ms from 'ms';
import { MovieListPanel } from '@component/organisms/movieListPanel';
import { MOVIE_QUERIES } from '@hook/query/movie/movie.queries';
import { fetchMovieList } from '@hook/query/movie/useGetMovieList';
import { margin } from 'polished';
import { Header } from '@component/organisms/header';

const Index: NextPage = () => {
  const [css] = useStyletron();

  return (
    <>
      <Header />
      <div
        className={css({
          display: 'inline-block',
          ...margin('48px', 'auto'),
        })}
      >
        <b
          className={css({
            fontSize: '24px',
            lineHeight: '36px',
            color: '#333333',
          })}
        >
          영화 목록
        </b>
      </div>
      <MovieListPanel />
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(MOVIE_QUERIES.MOVIE_LIST(), fetchMovieList),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ms('1d') / 1000,
  };
};

export { getStaticProps };
export default Index;
