const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env) {
    if (!env.folder) {
        throw new Error("No folder specified.");
    }

    const folder = env.folder;
    const files = glob.sync(folder + "/**/*.scss");
    let entryObj = {};

    files.forEach((filepath) => {
        const dirArr = filepath.split("/");

        // Get the file name without the extension (assuming filename is [filename].[extension]
        const file = dirArr[dirArr.length-1];
        const filename = file.slice(0, file.indexOf("."));

        // Get directory path where the file resides 
        const dirPath = dirArr.slice(0, dirArr.length-1).join("/");

        entryObj[dirPath + "/" + filename] = filepath;
    });


    console.log(entryObj);

    return {
        entry: entryObj,

        output: {
            path: __dirname,
            filename: "[name].css"
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
                filename: function(getPath) {
                    const name = getPath("[name].css");
                    return name;
                }
            })
        ]
    };
};
