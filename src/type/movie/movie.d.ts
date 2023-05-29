interface BelongsToCollectionType {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface GenreType {
  id: number;
  name: string;
}

interface ProductionCompanyType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountryType {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguageType {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type {
  BelongsToCollectionType,
  GenreType,
  ProductionCompanyType,
  ProductionCountryType,
  SpokenLanguageType,
};
