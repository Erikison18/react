const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');

function common(config) {

    /*
    entry
    */

    let originEntry = config.entry

    config.entry = {
        main: [
            ...originEntry.splice(1)
        ],
        vendors: [
            ...originEntry,
            require.resolve(path.join(paths.appSrc, 'public', '/js/vendor.js')),
        ]
    }

    /*
    output
    */
    config.output.filename = 'static/js/[name].js';

    /*
    alias
    */
    config.resolve.alias['@src'] = path.join(__dirname, '../src');
    config.resolve.alias['@redux'] = path.join(__dirname, '../src/redux');
    config.resolve.alias['@models'] = path.join(__dirname, '../src/redux/models');
    config.resolve.alias['@middleware'] = path.join(__dirname, '../src/redux/middleware');
    config.resolve.alias['@components'] = path.join(__dirname, '../src/components');
    config.resolve.alias['@layout'] = path.join(__dirname, '../src/components/layout');
    config.resolve.alias['@common'] = path.join(__dirname, '../src/components/common');
    config.resolve.alias['@js'] = path.join(paths.appSrc, 'public', '/js');
    config.resolve.alias['@style'] = path.join(paths.appSrc, 'public', '/style');
    config.resolve.alias['@img'] = path.join(paths.appSrc, 'public', '/img');

    /*
    extensions
    */
    config.resolve.extensions.push('less');

    /*
    loader
    */
    config.module.rules[1].oneOf[3].exclude.push(/\.less$/);

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: path.join('static/js/[name].js')
    }))

    return config;

}

exports.dev = function(config) {

    config = common(config);

    config.module.rules[1].oneOf.push({
        test: /\.less$/,
        use: [
            require.resolve('style-loader'), {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                },
            }, {
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                        })
                    ]
                }
            }, {
                loader: require.resolve('less-loader')
            }
        ]
    });

    return config;

}

exports.prod = function(config, {
    shouldUseSourceMap,
    extractTextPluginOptions
}) {

    config = common(config);

    // config.output.path = path.join(__dirname, '../webapp');

    config.module.rules[1].oneOf.push({
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
            Object.assign({
                fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                        hmr: false,
                    },
                },
                use: [{
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                    },
                }, {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                }, {
                    loader: require.resolve('less-loader')
                }]
            }, extractTextPluginOptions)
        )
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
    });

    return config;
}