import { GetStaticProps, NextPage } from 'next';
import { useStyletron } from 'styletron-react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import ms from 'ms';

const Index: NextPage = () => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'flex',
      })}
    >
      <span>asdf</span>
    </div>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ms('1d') / 1000,
  };
};

export { getStaticProps };
export default Index;
