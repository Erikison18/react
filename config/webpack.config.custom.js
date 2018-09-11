const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const webpack = require('webpack');
const paths = require('./paths');
const {iconFontCDNUrl,proIconFontDirectory,iconfontFileName} = require('./config.custom.js');

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
    config.resolve.alias['@other'] = path.join(paths.appSrc, 'public', '/other');

    /*
    extensions
    */
    config.resolve.extensions.push('less');

    /*
    loader
    */
    config.module.rules[1].oneOf[3].exclude.push(/\.less$/);


    return config;

}

exports.dev = function(config) {

    config = common(config);

    /*
    output
    */
    config.output.filename = 'static/js/[name].js';

    //添加less-loader
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
                loader: require.resolve('less-loader'),
            }
        ]
    });


    //plugins
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: path.join('static/js/[name].js')
    }));
    //iconfont配置
    config.plugins.push(new InterpolateHtmlPlugin({
        ICON_FONT_SOUCE:iconFontCDNUrl?`<link rel="stylesheet" href="${iconFontCDNUrl}">`:''
    }));


    //解决ie兼容
    // config.module.rules.push({
    //     test: /.js$/,
    //     enforce: 'post', // post-loader处理
    //     loader: 'es3ify-loader'
    // });
    // config.plugins.push(new es3ifyPlugin());

    return config;

}

exports.prod = function(config, {
    shouldUseSourceMap,
    extractTextPluginOptions
}) {

    config = common(config);

    //添加polyfill
    config.entry.vendors.unshift(require.resolve('babel-polyfill'));
    config.entry.vendors.unshift(require.resolve('raf/polyfill'));

    //添加本地iconfont
    if(iconFontCDNUrl && proIconFontDirectory && iconfontFileName)
        config.entry.vendors.unshift(require.resolve(`${proIconFontDirectory}/${iconfontFileName}.css`));

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


    //plugins
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: path.join('static/js/[name].[chunkhash:8].js')
    }));

    config.plugins.push(new InterpolateHtmlPlugin({
        ICON_FONT_SOUCE:''
    }));

    config.plugins.push(new es3ifyPlugin());

    return config;
}



