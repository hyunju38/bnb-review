var webpack = require('webpack');
var webpackConfigBuilder = require('../webpack.config');
var webpackConfig = webpackConfigBuilder('production');

webpack(webpackConfig).run((err, stats) => {

    if (err) {
        console.log(err);
        return 1;
    }

    var jsonStats = stats.toJson();
    if (jsonStats.errors.length) {
        return handleSoftErrors(jsonStats.errors);
    }

    jsonStats.warnings.length > 0 && (() => {
        jsonStats.warnings.forEach((warning) => console.log(warning));
    })();

    console.log("compiled successfully!");
});
