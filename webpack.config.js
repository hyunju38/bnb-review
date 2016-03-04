import webpack from 'webpack';
import path from 'path';

const getEntry = (env) => {
  var entry = [];

  if (env === 'development') {
    entry.push('webpack-hot-middleware/client');
  }

  entry.push('./clients/src/index');
  return entry;
};

const getPlugins = (env) => {
  var plugins = [
    new webpack.optimize.OccurenceOrderPlugin()
  ];
  switch(env) {
    case 'production':
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true}));   // script 압축
      break;
    case 'development':
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }
  return plugins;
};

module.exports = (env) => {
  return {
    entry: getEntry(env),
    output: {
      path: path.join(__dirname + '/dist'),
      publicPath: '/dist/',
      filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loaders: ['babel', 'eslint'] },
        { test: /\.scss$/, exclude: /node_modules/, loaders: ['style', 'css', 'sass'] }
      ]
    },
    plugins: getPlugins(env)
  };
};
