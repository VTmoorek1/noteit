var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, './');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /(node_modules|server|bin)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|server)/,
                use: 'ts-loader'
            }
            
        ]
    },
    mode : 'development',
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true,
        stats: 'errors-only'
    },
    watchOptions: {
        poll: true,
        ignored: /node_modules/
      },
      "devtool": "eval-source-map",
      resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
      }
}