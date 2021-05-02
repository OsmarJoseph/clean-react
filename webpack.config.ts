import * as path from 'path'
import { HotModuleReplacementPlugin, Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import sass from 'sass'

interface Configuration extends WebpackConfiguration {
  devServer: WebpackDevServerConfiguration
}

const config: Configuration = {
  mode: 'development',
  target: 'web',
  entry: './src/main/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    contentBase: './public',
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: 'minimal',
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('public/index.html'),
    }),
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
}

export default config
