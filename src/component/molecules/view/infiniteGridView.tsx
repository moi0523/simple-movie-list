import {ReactNode} from 'react';
import {useStyletron} from 'styletron-react';
import {InfiniteData} from '@tanstack/query-core/src/types';

interface InfiniteGridViewProps<T> {
  data: InfiniteData<{ data: T[] }>;
  columnCount: number;
  columnGap?: string;
  rowGap?: string;
  renderContent: (props: T, index: number) => ReactNode;
}

type InfiniteGridViewDefaultData = unknown | Record<string, unknown>;

const InfiniteGridView = <T extends InfiniteGridViewDefaultData>({
  data,
  columnCount,
  columnGap = '0px',
  rowGap = '0px',
  renderContent,
}: InfiniteGridViewProps<T>) => {
  const [css] = useStyletron();

  return (
    <article
      className={css({
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
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            columnGap,
            rowGap,
          })}
        >
          {page.data?.map((item, itemIndex) => (
            <li key={`infinite-grid-view-${itemIndex}`}>
              {renderContent?.(item, itemIndex)}
            </li>
          ))}
        </section>
      ))}
    </article>
  );
};

export { InfiniteGridView };
export type { InfiniteGridViewProps };
