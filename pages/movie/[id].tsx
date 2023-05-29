import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { GetStaticPropsGeneric } from '@type/staticPage';
import ms from 'ms';
import { useStyletron } from 'styletron-react';
import { useGetMovieDetailQuery } from '@hook/query/movie/useGetMovieDetail';
import { useEffect } from 'react';

type Params = 'id';
type Query = Record<Params, string>;

interface MovieDetailProps {
  query: Query;
}

const MovieDetail = ({ query }: MovieDetailProps) => {
  const [css] = useStyletron();
  const { data } = useGetMovieDetailQuery(query.id as unknown as number);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <>
      <span
        className={css({
          fontSize: '24px',
        })}
      >
        asdf
      </span>
    </>
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
