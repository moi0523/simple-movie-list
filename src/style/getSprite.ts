import { breakingSpace } from '@style/mixin';
import { resolve } from 'path';
import { PickImageSet, SpriteDirectories } from '@type/assetTypeHelper';

type SpriteSmithResultObj = {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  source_image: string;
  image: string;
  escaped_image: string;
  total_width: number;
  total_height: number;
  offset_x: number;
  offset_y: number;
  px: {
    x: string;
    y: string;
    offset_x: string;
    offset_y: string;
    height: string;
    width: string;
    total_height: string;
    total_width: string;
  };
};

const ROOT_DIR = resolve();

const getJSONIfItExisting = (
  JSONName: SpriteDirectories,
  specificSpriteImgName: string,
) => {
  let selectedJSON: SpriteSmithResultObj[];

  try {
    selectedJSON = require(`${ROOT_DIR}/src/asset/dist/sprites/sprite-${JSONName}.generated.json`);
  } catch {
    return '';
  }

  return selectedJSON.find(
    ({ name }: { name: string }) => name === specificSpriteImgName,
  );
};

type makeSpriteIMGProps<T extends SpriteDirectories> = {
  dir: T;
  img: PickImageSet<T>;
  imgSize?: {
    width: number;
    height: number;
  };
  ratio?: number;
  containerWidth?: string | number;
  breaking?: string | number;
};

const SPRITE_IMAGE_DEFAULT_RATIO = 0.25;

const makeSpriteIMG = <T extends SpriteDirectories>({
  dir: directoryName,
  img: specificSpriteImgName,
  imgSize,
  ratio = SPRITE_IMAGE_DEFAULT_RATIO,
  containerWidth,
  breaking,
}: makeSpriteIMGProps<T>) => {
  const obtainedJSON = getJSONIfItExisting(
    directoryName,
    specificSpriteImgName,
  );

  if (obtainedJSON) {
    const {
      width,
      height,
      px: { offset_x },
      y,
      escaped_image,
      total_width,
      total_height,
    } = obtainedJSON;
    const positionY = y / (total_height - height);
    const hasBreaking = !!breaking && !!containerWidth;

    return {
      display: 'inline-block',
      width: `${imgSize?.width || width * ratio}px`,
      height: `${imgSize?.height || height * ratio}px`,
      backgroundSize: `${(total_width / width) * 100}% auto`,
      backgroundPositionY: `${(!isNaN(positionY) ? positionY : 0) * 100}%`,
      backgroundPositionX: `${offset_x}`,
      backgroundImage: `url(${escaped_image})`,
      backgroundRepeat: 'no-repeat',
      ...(hasBreaking && {
        [`@media all and (min-width: ${breaking}px)`]: {
          height: 0,
          width: breakingSpace('width', width * ratio, containerWidth),
          paddingTop: breakingSpace(
            'paddingTop',
            height * ratio,
            containerWidth,
          ),
        },
      }),
    };
  } else {
    return {};
  }
};

export { makeSpriteIMG };
