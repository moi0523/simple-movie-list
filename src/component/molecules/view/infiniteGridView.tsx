import { ReactNode, useEffect, useRef, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { InfiniteData } from '@tanstack/query-core/src/types';
import { useIntersection } from 'react-use';

interface InfiniteGridViewProps<T> {
  data: InfiniteData<T[]>;
  columnCount: number;
  columnGap?: string;
  rowGap?: string;
  fetchNextPage: () => Promise<{ isSuccess: boolean }>;
  renderContent: (props: T, index: number) => ReactNode;
}

type InfiniteGridViewDefaultData = unknown | Record<string, unknown>;

const InfiniteGridView = <T extends InfiniteGridViewDefaultData>({
  data,
  columnCount,
  columnGap = '0px',
  rowGap = '0px',
  fetchNextPage,
  renderContent,
}: InfiniteGridViewProps<T>) => {
  const [css] = useStyletron();
  const [isFetched, setIsFetched] = useState(true);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  useEffect(() => {
    if (isFetched && intersection && intersection.intersectionRatio > 0.5) {
      (async () => {
        setIsFetched(false);
        await fetchNextPage().then((result) => {
          if (result.isSuccess) {
            setTimeout(() => {
              setIsFetched(true);
            }, 500);
          }
        });
      })();
    }
  }, [fetchNextPage, intersection, isFetched]);

  return (
    <article
      className={css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {data?.pages?.map((page, pageIndex) => (
        <section
          key={pageIndex}
          className={css({
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${columnCount}, 200px)`,
            columnGap,
            rowGap,
          })}
        >
          {page?.map((item, itemIndex) => (
            <li key={`infinite-grid-view-${itemIndex}`}>
              {renderContent?.(item, itemIndex)}
            </li>
          ))}
        </section>
      ))}
      <div
        ref={intersectionRef}
        className={css({
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '720px',
          zIndex: '-1',
        })}
      />
    </article>
  );
};

export { InfiniteGridView };
export type { InfiniteGridViewProps };
