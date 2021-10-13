import { Configuration as WebpackConfiguration, EnvironmentPlugin } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import * as path from 'path'
import dotenv from 'dotenv'

export interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

export const common: Configuration = {
  entry: path.resolve('src', 'main', 'index.tsx'),
  output: {
    path: path.resolve('dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  stats: 'minimal',
  plugins: [new CleanWebpackPlugin(), new EnvironmentPlugin(dotenv.config().parsed)],
}
