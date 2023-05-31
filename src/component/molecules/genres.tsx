import { GenreType } from '@type/movie/movie';
import { useStyletron } from 'styletron-react';
import { border, borderRadius, padding } from 'polished';

interface GenresProps {
  data: GenreType[];
}

const Genres = ({ data }: GenresProps) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '8px',
        rowGap: '8px',
      })}
    >
      {data.map((genre) => (
        <div
          key={`genre-${genre.id}`}
          className={css({
            display: 'inline-block',
            textAlign: 'center',
            ...padding('4px', '8px'),
            ...border('1px', 'solid', '#e0e0e0'),
            ...borderRadius('top', '4px'),
            ...borderRadius('bottom', '4px'),
          })}
        >
          <span
            className={css({
              fontSize: '12px',
              lineHeight: '18px',
              color: '#333333',
            })}
          >
            {genre.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export type { GenresProps };
export { Genres };
