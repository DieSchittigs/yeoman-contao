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
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, include: path.join(__dirname, 'src/<%= theme %>/fonts'), loader: {
                loader: 'file-loader',
                options: {outputPath: 'files/fonts', publicPath: '../fonts/'}
            } },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, include: path.join(__dirname, 'src/<%= theme %>/img'), loader: {
                loader: 'file-loader',
                options: {outputPath: 'files/img', publicPath: '../img/'}
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
        }),
        new ExtractTextPlugin('css/screen.css')
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

loaderOptions = production ? {
    sourceMap: false,
    minimize: true
} : {
    sourceMap: true,
    minimize: false
};

const jsConfig = _.cloneDeep(config);
jsConfig.entry = './src/<%= theme %>/js/script.js';
jsConfig.output.filename = 'js/script.js';
jsConfig.module.rules.push({
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
});

const cssConfig = _.cloneDeep(config);
cssConfig.entry = './src/<%= theme %>/scss/screen.scss';
cssConfig.output.filename = 'css/screen.css';
cssConfig.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {loader: 'css-loader', options: loaderOptions},
            {loader: 'sass-loader', options: loaderOptions}
        ]
    })
});

module.exports = [jsConfig, cssConfig];
