import {
  BelongsToCollectionType,
  GenreType,
  ProductionCompanyType,
  ProductionCountryType,
  SpokenLanguageType,
} from '@type/movie/movie';

interface MovieDetailType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollectionType;
  budget: number;
  genres: GenreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanyType[];
  production_countries: ProductionCountryType[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageType[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export type { MovieDetailType };
