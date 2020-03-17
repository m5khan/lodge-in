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


const webConfig = {
    mode: "production",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",
    entry: ["./app/index.tsx"],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'client.js'
    },
    
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                //exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
              }
        ]
    }
    
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
}


module.exports = [
    serverConfig,
    webConfig
] 