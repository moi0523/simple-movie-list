import { readdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const ROOT_DIR = resolve();
const spriteRootDirectory = join(ROOT_DIR, 'src/asset/sprites');

const convertArrayToUnionType = (array: string[]) =>
  array.length ? array.map((name) => `'${name}'`).join(' | ') : 'never';

const getSpriteDirectories = readdirSync(spriteRootDirectory, {
  withFileTypes: true,
})
  .filter((dir) => dir.isDirectory())
  .map(({ name }) => name);

const getSVGs = readdirSync(join(ROOT_DIR, 'src/asset/svgs'), {
  withFileTypes: true,
})
  .filter((dir) => dir.name.endsWith('svg'))
  .map(({ name }) => name.replace('.svg', ''));

const allOfImagesUnionType: string[] = [];
const generateSpriteTypes = getSpriteDirectories.reduce((prev, current) => {
  const spriteImageName = `${[
    current[0].toUpperCase(),
    ...current.slice(1),
  ].join('')}SpriteImages`;
  allOfImagesUnionType.push(`${current}: ${spriteImageName}`);

  return `${prev}
export type ${spriteImageName} = ${convertArrayToUnionType(
    readdirSync(join(spriteRootDirectory, current))
      .filter((name) => name.endsWith('.png'))
      .map((value) => value.replace('.png', '')),
  )};
    `;
}, `export type SpriteDirectories = ${convertArrayToUnionType(getSpriteDirectories)};`);

const generationPath = join(ROOT_DIR, 'src/type');

writeFileSync(
  `${generationPath}/assetTypeHelper.ts`,
  `${generateSpriteTypes}
export interface AllOfSpriteImages {
${allOfImagesUnionType.join(';\n')}
};

export type PickImageSet<T extends SpriteDirectories> = AllOfSpriteImages[T];
export type SVGNames = ${convertArrayToUnionType(getSVGs)};
`,
);
