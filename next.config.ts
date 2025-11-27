import bundleAnalyzer from '@next/bundle-analyzer'
import withSerwistInit from '@serwist/next'
import AutoImport from 'unplugin-auto-import/webpack'
import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === 'true',
})

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
})

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: true,
    swcPlugins: [['@lingui/swc-plugin', {}]],
    // turbo: {
    //   rules: {
    //     "*.po": {
    //       loaders: ["@lingui/loader"],
    //       as: "*.js",
    //     },
    //   },
    // },
  },
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader',
      },
    })

    config.plugins.push(
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        ],
        imports: [
          'react',
          {
            twl: ['cn'],
          },
          {
            from: 'motion/react-m',
            imports: [['*', 'motion']],
          },
          {
            from: '~/lib/orpc',
            imports: ['orpc'],
          },
          {
            from: '@tanstack/react-query',
            imports: ['useQuery', 'useMutation'],
          },
          {
            from: '~/i18n/navigation',
            imports: ['Link', 'usePathname', 'useRouter'],
          },
        ],
        dts: true,
      }),
    )

    return config
  },
}

export default [withBundleAnalyzer, withSerwist].reduce(
  (config, withFn) => withFn(config),
  nextConfig,
)
