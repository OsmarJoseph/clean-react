import { common, Configuration } from './webpack.common'

import * as path from 'path'
import { HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import sass from 'sass'
import merge from 'webpack-merge'

const config: Configuration = merge(common, {
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: './public',
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  devtool: 'inline-source-map',
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
      template: path.resolve('public', 'template.dev.html'),
    }),
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
})

export default config
