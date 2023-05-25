export type SpriteDirectories = 'test';
export type TestSpriteImages = 'a';

export interface AllOfSpriteImages {
  test: TestSpriteImages;
}

export type PickImageSet<T extends SpriteDirectories> = AllOfSpriteImages[T];
export type SVGNames = never;
