import {useStyletron} from 'styletron-react';
import {ReactNode} from 'react';

interface GridViewProps<T> {
  data: T[];
  columnCount: number;
  columnGap?: string;
  rowGap?: string;
  renderContent: (props: T, index: number) => ReactNode;
}

type GridViewDefaultData =
  | unknown
  | (Record<string, unknown> & {
      id: number;
    });

const GridView = <T extends GridViewDefaultData>({
  data,
  columnCount,
  columnGap = '0px',
  rowGap = '0px',
  renderContent,
}: GridViewProps<T>) => {
  const [css] = useStyletron();

  return (
    <article
      className={css({
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        columnGap,
        rowGap,
      })}
    >
      {data?.map((item, index) => (
        <li key={`grid-view-${index}`}>{renderContent?.(item, index)}</li>
      ))}
    </article>
  );
};

export type { GridViewProps };
export { GridView };
