const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');


const serverConfig = {
    entry: ['./src/index.ts'],
    devtool: 'source-map',
    target: 'node',
    externals: [
        nodeExternals()
    ],
    module: {
        rules : [
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    mode: 'production',
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "server.js"
    }
}


module.exports = [
    serverConfig

] 