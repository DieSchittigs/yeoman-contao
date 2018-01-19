const fs = require('fs')
const path = require('path')
const { mix } = require('laravel-mix');
const webpack = require('webpack');
/*
|--------------------------------------------------------------------------
| Mix Asset Management
|--------------------------------------------------------------------------
|
| Mix provides a clean, fluent API for defining some Webpack build steps
| for your Laravel application. By default, we are compiling the Sass
| file for the application as well as bundling up all the JS files.
|
*/
mix.setPublicPath('files/theme_<%= theme %>')
.webpackConfig({
    output: { chunkFilename: mix.inProduction() ? './js/chunk_[name].[chunkhash].js' : './js/chunk_[name].js', publicPath: '/' },
    resolve: {
        alias: {
            jquery: path.resolve('./node_modules/jquery'),
            lodash: path.resolve('./node_modules/lodash')
        }
    }
})

.js('src/<%= theme %>/js/script.js', 'js')
.sass('src/<%= theme %>/scss/screen.scss', 'css')
.copy('src/<%= theme %>/img/**', 'files/theme_<%= theme %>/img')
