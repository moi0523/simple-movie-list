import Image from 'next/image';
import { useStyletron } from 'styletron-react';
import { createMovieImageUrl } from '@helper/createMovieImageUrl';
import { Genres } from '@component/molecules/genres';
import { MovieDetailType } from '@type/movie/movieDetail';

const MovieInfo = ({
  title,
  poster_path,
  tagline,
  genres,
  runtime,
  release_date,
  overview,
}: MovieDetailType) => {
  const [css] = useStyletron();

  return (
    <article
      className={css({
        display: 'flex',
        columnGap: '60px',
      })}
    >
      <Image
        src={createMovieImageUrl(poster_path, 200)}
        alt={`${title} 포스터`}
        width={200}
        height={300}
      />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <b
          className={css({
            fontSize: '32px',
          })}
        >
          {title}
        </b>
        <span
          className={css({
            fontSize: '14px',
            lineHeight: '21px',
            color: '#676767',
            marginBottom: '16px',
            maxWidth: '400px',
          })}
        >
          {tagline}
        </span>
        <Genres data={genres} />
        <span
          className={css({
            fontSize: '16px',
            marginTop: '24px',
          })}
        >
          상영시간: {runtime}분
        </span>
        <span
          className={css({
            fontSize: '16px',
            marginTop: '8px',
          })}
        >
          개봉일: {release_date}
        </span>
        <span
          className={css({
            fontSize: '16px',
            marginTop: '8px',
            maxWidth: '400px',
          })}
        >
          {overview}
        </span>
      </div>
    </article>
  );
};

export default MovieInfo;
