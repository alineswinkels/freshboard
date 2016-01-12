var _ = require('lodash'),
    path = require('path'),
    webpack = require('webpack');

var dev = {
    imports: [],
    entries: { app: ['src/scss/app.scss', 'src/js/app.js'] },
    sass: {
        outputStyle: 'nested',
        includePaths: [
            path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets')
        ]
    },
    stats: {},
    webpack: {
        resolve: {
            modulesDirectories: ['node_modules', 'bower_components'],
            alias: {
                jquery: path.resolve(__dirname, 'node_modules/jquery')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                'window.$': 'jquery',
                'window.jQuery': 'jquery'
            })
        ]
    }
};

var prod = _.merge({}, dev, {
    js: { uglify: true },
    sass: { outputStyle: 'compressed' }
});

module.exports = {
    dev: _.merge(dev, { publicPath: '/fh/web/assets/frontend/build/' }),
    docker: _.merge(
        {},
        dev,
        {
            publicPath: '/assets/frontend/build/',
            webpack: {
                watchOptions: { poll: true }
            }
        }
    ),
    prod: prod,
    staging: prod,
    test: _.merge({}, prod, { publicPath: '/fh/web/assets/frontend/build/' })
};
