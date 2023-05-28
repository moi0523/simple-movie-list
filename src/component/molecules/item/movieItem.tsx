import {Link} from '@component/atoms/link';
import {useStyletron} from 'styletron-react';
import Image from 'next/image';
import {MovieItemType} from '@type/movie/movieItem';

interface MovieItemProps extends MovieItemType {
  test?: number;
}

const MovieItem = ({
  adult,
  backdrop_path,
  genre_ids,
  id,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  video,
  vote_average,
  vote_count,
}: MovieItemProps) => {
  const [css] = useStyletron();

  return (
    <Link href={`/movie/${id}`}>
      <article
        className={css({
          maxWidth: '200px',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            width: '100%',
            height: '100%',
            aspectRatio: 1,
            display: 'flex',
            position: 'relative',
            flex: 1,
          })}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={`${title} 포스터`}
            width={200}
            height={300}
            loading="lazy"
          />
        </div>
        <b
          className={css({
            fontSize: '16px',
            lineHeight: '18px',
            color: '#333333',
          })}
        >
          {title}
        </b>
        <span
          className={css({
            fontSize: '14px',
            lineHeight: '14px',
            color: '#333333',
          })}
        >
          개봉일: {release_date}
        </span>
      </article>
    </Link>
  );
};

export { MovieItem };
export type { MovieItemProps };
