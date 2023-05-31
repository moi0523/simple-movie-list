import { useStyletron } from 'styletron-react';
import { Link } from '@component/atoms/link';
import { MovieItemType } from '@type/movie/movieItem';

interface SearchTextProps {
  id: number;
  value: string;
  data: MovieItemType;
}

const SearchText = ({ id, value, data }: SearchTextProps) => {
  const [css] = useStyletron();
  const isEnglish = /[a-zA-Z]/.test(value);
  const textArray = isEnglish ? data.original_title : data.title;

  return (
    <div
      className={css({
        display: 'initialBlock',
        fontSize: '16px',
        lineHeight: '30px',
        color: '#333333',
      })}
    >
      <Link
        href={`/movie/${id}`}
        overrides={{
          Root: {
            style: {
              display: 'block',
            },
          },
        }}
      >
        {textArray.split(value).map((text, index) => {
          console.log(text, value);
          return (
            <>
              {index !== 0 && (
                <b className={css({ color: '#000000' })}>{value}</b>
              )}
              <span className={css({ color: '#707070' })}>{text}</span>
            </>
          );
        })}
      </Link>
    </div>
  );
};

export type { SearchTextProps };
export { SearchText };
