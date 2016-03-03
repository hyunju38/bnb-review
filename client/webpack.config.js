var webpack = require('webpack');
var path = require('path');

var getEntry = (env) => {
    var entry = [];

    if (env === 'development') {
      entry.push('webpack-hot-middleware/client');
    }

    // bootstrapclear
    entry.push('bootstrap-loader');
    entry.push('./src/index');
    return entry;
};

var getPlugins = (env) => {
    var plugins = [new webpack.optimize.OccurenceOrderPlugin()];
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
                { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint'] },
                { test: /\.scss$/, include: path.join(__dirname, 'src'), loaders: ['style', 'css', 'sass'] },
                {
                    test: /\.css$/,
                    loaders: [
                        'style',
                        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
                        'postcss',
                    ],
                },
                {
                    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url?limit=10000"
                },
                {
                    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                    loader: 'file'
                },
                { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' }
            ]
        },
        plugins: getPlugins(env)
    };
};
