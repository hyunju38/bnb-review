import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


import app from './server/app';
import mongodb from './server/libs/mongodb';
import webpackConfigBuilder from './webpack.config';
const webpackConfig = webpackConfigBuilder(process.env.NODE_ENV);

const isDev = process.env.NODE_ENV === 'development' ? 'development' : 'production';

if (isDev) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

mongodb.connect(() => {
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
});
