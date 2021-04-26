import * as path from 'path'
import { HotModuleReplacementPlugin, Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import sass from 'sass'

interface Configuration extends WebpackConfiguration {
  devServer: WebpackDevServerConfiguration
}

const config: Configuration = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve('public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    contentBase: './public',
    writeToDisk: true,
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
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
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
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [new HotModuleReplacementPlugin(), new CleanWebpackPlugin()],
}

export default config
