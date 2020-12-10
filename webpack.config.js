const webpack = require('webpack');
const path = require('path');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
  performance: {
    maxEntrypointSize: 9e5,
    maxAssetSize: 9e5
  },
  devServer: {
    open: false,
    contentBase: path.join(__dirname, 'src'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application',
      template: './src/index.html',
      filename: 'index.html',
    }),
    new GenerateSW({
      skipWaiting: false,
      maximumFileSizeToCacheInBytes: devMode ? 64e3 : 32e6,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]_[hash:base64:5]',
              },
              esModule: true,
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        loader: 'raw-loader',
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'file-loader'
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            if (devMode) {
              return '[path][name].[ext]';
            }
            return '[contenthash].[ext]';
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: true,
        },
      },
    ],
  },
};
