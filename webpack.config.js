const TerserPlugin = require('terser-webpack-plugin');
var path = require('path')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env', '@babel/react']
            }
        },
        {
            test: /\.css$/, use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
            ]
        },
         {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            ]
        }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};