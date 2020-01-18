const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'style.js',
    },
    module: {
        rules: [
            {
                // JS Rules
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // SASS / SCSS / CSS Rules
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    {
                        loader: 'style-loader'
                    },
                    // Extract SASS/SCSS to css CSS files
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    },
                    // CSS Rules
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: true,
                            sourceMap: true,
                        },
                    },
                    // Auto Prefix CSS
                    {
                        loader: 'postcss-loader'
                    },
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: ['./src/style.sass'],
                                outputStyle: 'uncompressed',
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                // SVG Images Rules
                test: /\.svg$/,
                use: 'file-loader'
            },
            {
                // PNG Images Rules
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new LodashModuleReplacementPlugin,
        // Index Page Html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        // CSS file
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "style.css"
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 2020
    },
};
