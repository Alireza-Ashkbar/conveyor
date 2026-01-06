// next.config.js
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    // This fixes potential "THREE is not defined" from legacy deps like three-bmfont-text
    config.plugins.push(
      new webpack.ProvidePlugin({
        THREE: 'three',
      })
    );

    return config;
  },
};

module.exports = nextConfig;