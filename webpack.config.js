const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
	entry: `${SRC_DIR}/index.jsx`,
	module: {loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]},
	output: {
		path: `${DIST_DIR}`,
		filename: 'index_bundle.js'
	}
};