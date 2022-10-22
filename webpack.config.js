const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebPackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';
const prod = !dev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'/* (chunk) {
                return chunk.name !== 'my-excluded-chunk';
            } */
        }
    }
    if (prod) {
        config.minimizer = [
            new CSSMinimizerWebPackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
    return config

}

const filename = ext => dev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.png', '.json', '.css', '.csv'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    /*  {
         splitChunks: {
             chunks(chunk) {
                 return chunk.name !== 'my-excluded-chunk';
             },
         },
     }, */
    devServer: {
        port: 4200,
        hot: prod,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: prod
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "assets/favicon.ico", to:
                        path.join(__dirname, 'dist')
                },
            ],
            options: {
                concurrency: 100,
            },

        }),
        new MiniCSSPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCSSPlugin.loader, 'css-loader'], type: 'javascript/auto'
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ],

    }
}
