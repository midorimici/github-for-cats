import type { Configuration } from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const config: Configuration = {
  entry: {
    content_scripts: path.join(__dirname, 'src', 'contentScripts', 'main.ts'),
    background: path.join(__dirname, 'src', 'background', 'main.ts'),
    options: path.join(__dirname, 'src', 'options', 'index.tsx'),
    popup: path.join(__dirname, 'src', 'popup', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // Compiles Sass to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
};
