export const createMovieImageUrl = (fileName: string, width = 300) =>
  `https://image.tmdb.org/t/p/w${width}/${fileName}`;
