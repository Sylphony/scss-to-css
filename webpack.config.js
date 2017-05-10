const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env) {
    const file = env.file;
    const folderName = file.split("/")[1];

    return {
        entry: file,

        output: {
            path: __dirname,
            filename: folderName + "/styles.css"
        },

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: "css-loader",
                            },
                            "postcss-loader",
                            {
                                loader: "sass-loader",
                                query: {
                                    outputStyle: "expanded"
                                }
                            }
                        ],
                    })
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin({
                filename: folderName + "/styles.css"
            })
        ]
    };
};
