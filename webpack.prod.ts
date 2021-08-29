import { common } from './webpack.common'
import * as path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import sass from 'sass'
import merge from 'webpack-merge'

const config: Configuration = merge(common, {
  mode: 'production',
  target: 'browserslist',
  output: {
    path: path.resolve('dist'),
    filename: 'main-bundle-[fullhash].js',
    publicPath: './',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    axios: 'axios',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'template.prod.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[fullhash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve('public', 'favicon.png'),
    }),
  ],
})

export default config
