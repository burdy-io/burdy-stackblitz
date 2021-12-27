/** @type {import('next').NextConfig} */
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build

    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    Object.assign(config.resolve.alias, {
      ...(config.resolve.alias ?? {}),
      '@restart/hooks': path.resolve(__dirname, 'node_modules', '@restart/hooks'),
    });

    return config;
  },
  images: {
    loader: 'imgix',
    path: 'https://noop/',
  },
};
