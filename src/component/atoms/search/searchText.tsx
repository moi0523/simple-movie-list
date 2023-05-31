import { useStyletron } from 'styletron-react';
import { Link } from '@component/atoms/link';

interface SearchTextProps {
  id: number;
  value: string;
  searchText: string;
}

const SearchText = ({ id, value, searchText }: SearchTextProps) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'initialBlock',
        fontSize: '16px',
        lineHeight: '30px',
        color: '#333333',
      })}
    >
      {searchText.split(value).map((text, index) => {
        return (
          <Link
            key={index}
            href={`/movie/${id}`}
            overrides={{
              Root: {
                style: {
                  display: 'block',
                },
              },
            }}
          >
            {index !== 0 && <b>{value}</b>}
            <span>{text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export type { SearchTextProps };
export { SearchText };
