const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const withImages = require('next-images')

module.exports = withImages({
    esModule: true,
    trailingSlash: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
       webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(new CopyPlugin([
            { from: path.join(__dirname, 'node_modules/tinymce/skins'), to: path.join(__dirname, 'public/assets/libs/tinymce/skins') }, /// Copy to public folder
        ]));
        return config
    },
    webpackDevMiddleware: config => {
        return config
    },
})