const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');

const production = process.env.NODE_ENV === 'production';

const config = {
    mode: production ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, "files/theme_<%= theme %>/dist"),
        publicPath: '/files/theme_<%= theme %>/dist'
    },
    module: {
        rules: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, include: path.join(__dirname, 'src/<%= theme %>/fonts'), loader: {
                loader: 'file-loader',
                options: {outputPath: '/', publicPath: './'}
            } },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, include: path.join(__dirname, 'src/<%= theme %>/img'), loader: {
                loader: 'file-loader',
                options: {outputPath: '/', publicPath: './'}
            } },
            { test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/, include: path.join(__dirname, 'node_modules'), loader: {
                loader: 'file-loader',
                options: {outputPath: '/', publicPath: './'}
            } }
        ]
    },
    stats: {
        colors: true
    },
    resolve: {
        alias: { '~': path.resolve(__dirname, 'node_modules') }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devtool: "cheap-module-source-map"
};

if(production){
    config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1,
            moveToParents: true
        })
    );
    config.devtool = undefined;
}

const loaderOptions = { sourceMap: !production };

function createConfig(entry, outputFilename, rules, plugins = null){
    const _config = _.cloneDeep(config);
    _config.entry = path.resolve('./src/<%= theme %>/', entry);
    _config.output.filename = outputFilename;
    if(!Array.isArray(rules)) rules = [rules];
    _config.module.rules = _config.module.rules.concat(rules);
    if(plugins){
        if(!Array.isArray(plugins)) plugins = [plugins];
        _config.plugins = _config.plugins.concat(plugins);
    }
    return _config;
}

const jsConfig = createConfig(
    'js/script.js',
    'script.js',
    [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{ loader: 'css-loader', options: loaderOptions }]
            })
        }
    ]
);

const cssConfig = createConfig(
    'scss/screen.scss',
    'screen.css',
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {loader: 'css-loader', options: loaderOptions},
                {loader: 'sass-loader', options: loaderOptions}
            ]
        })
    },
    new ExtractTextPlugin('screen.css')
);

module.exports = [jsConfig, cssConfig];
