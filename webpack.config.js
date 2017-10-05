const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: {
    index_presenter: `${SRC_DIR}/components/presenter/index.jsx`,
    index_player: `${SRC_DIR}/components/player/index.jsx`,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: ['css-loader'],
      },
    ] },
  output: {
    path: `${DIST_DIR}`,
    filename: '[name].js',
  },
};
