import SpriteSmithPlugin from 'webpack-spritesmith';
import withPlugins from 'next-compose-plugins';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import generated from '@next/bundle-analyzer';

const withBundleAnalyzer = generated({
  enabled: process.env.ANALYZE === 'true',
});

const ROOT_DIR = resolve();
const IS_DEV_MODE = process.env.NODE_ENV === 'development';

const getSpriteSmithPlugin = (dirNames) => {
  return dirNames.map((dir) => {
    return new SpriteSmithPlugin({
      src: {
        cwd: join(ROOT_DIR, `src/asset/sprites/${dir}`),
        glob: '**/*.png',
      },
      target: {
        image: join(
          ROOT_DIR,
          `public/images/sprites/sprite-${dir}.generated.png`,
        ),
        css: [
          [
            join(
              ROOT_DIR,
              `src/asset/dist/sprites/sprite-${dir}.generated.json`,
            ),
            {
              format: 'json_array',
            },
          ],
        ],
      },
      apiOptions: {
        cssImageRef: `/images/sprites/sprite-${dir}.generated.png`,
      },
      spritesmithOptions: {
        algorithm: 'top-down',
        padding: 15,
      },
    });
  });
};

// see more detail: https://nextjs.org/docs/advanced-features/security-headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '',
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['image.tmdb.org'],
  },
  ...(!IS_DEV_MODE && {
    reactRemoveProperties: true,
    removeConsole: {
      exclude: ['error'],
    },
  }),
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    const generationPath = join(ROOT_DIR, 'src/asset/dist/sprites');

    if (!existsSync(generationPath)) {
      mkdirSync(generationPath, { recursive: true });
    }

    config.plugins.push(
      ...getSpriteSmithPlugin(
        readdirSync(join(ROOT_DIR, 'src/asset/dist/sprites')).filter(
          (dir) => !dir.match(/(^\.|\b\.json)/),
        ),
      ),
    );

    return config;
  },
};

export default withPlugins([withBundleAnalyzer], nextConfig);
