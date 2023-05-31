import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { GetStaticPropsGeneric } from '@type/staticPage';
import ms from 'ms';
import { useStyletron } from 'styletron-react';
import { useGetMovieDetailQuery } from '@hook/query/movie/useGetMovieDetail';
import { useEffect } from 'react';
import MovieInfo from '@component/organisms/detail/movieInfo';
import { margin } from 'polished';

type Params = 'id';
type Query = Record<Params, string>;

interface MovieDetailProps {
  query: Query;
}

const MovieDetail = ({ query }: MovieDetailProps) => {
  const [css] = useStyletron();
  const { data, status } = useGetMovieDetailQuery(
    query.id as unknown as number,
  );

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <div
      className={css({
        display: 'inline-block',
        ...margin('60px', 'auto'),
      })}
    >
      {status === 'success' && <MovieInfo {...data} />}
    </div>
  );
};

const getStaticPaths: GetStaticPaths<Query> = async () => {
  return { paths: [], fallback: 'blocking' };
};

const getStaticProps: GetStaticProps<GetStaticPropsGeneric, Query> = async ({
  params,
}) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      query: params,
    },
    revalidate: ms('1d') / 1000,
  };
};

export type { MovieDetailProps };
export { getStaticProps, getStaticPaths };
export default MovieDetail;
