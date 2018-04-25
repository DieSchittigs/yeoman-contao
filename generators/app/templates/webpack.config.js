const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const _ = require('lodash');

const production = process.env.NODE_ENV === 'production';

const config = {
    output: {
        path: path.resolve(__dirname, "files/theme_<%= theme %>"),
        publicPath: '/files/theme_<%= theme %>'
    },
    module: {
        rules: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, include: path.join(__dirname, 'src/2018/fonts'), loader: {
                loader: 'file-loader',
                options: {outputPath: 'fonts/', publicPath: '../'}
            } },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, include: path.join(__dirname, 'src/2018/img'), loader: {
                loader: 'file-loader',
                options: {outputPath: 'img/', publicPath: '../'}
            } },
            { test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/, include: path.join(__dirname, 'node_modules'), loader: {
                loader: 'file-loader',
                options: {outputPath: 'lib/', publicPath: '../'}
            } }
        ]
    },
    stats: {
        colors: true
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
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1,
            moveToParents: true
        })
    );
    config.devtool = undefined;
}

const loaderOptions = production ? {
    sourceMap: false,
    minimize: true
} : {
    sourceMap: true,
    minimize: false
};

function createConfig(entry, outputFilename, rules){
    const _config = _.cloneDeep(config);
    _config.entry = path.resolve('./src/<%= theme %>/', entry);
    _config.output.filename = outputFilename;
    if(!Array.isArray(rules)) rules = [rules];
    _config.module.rules = _config.module.rules.concat(rules);
    return _config;
}

const jsConfig = createConfig(
    'js/script.js',
    'js/script.js',
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
    'css/screen.css',
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {loader: 'css-loader', options: loaderOptions},
                {loader: 'sass-loader', options: loaderOptions}
            ]
        })
    }
);
cssConfig.plugins.push(new ExtractTextPlugin('css/screen.css'));

module.exports = [jsConfig, cssConfig];
