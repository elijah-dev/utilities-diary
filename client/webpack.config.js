const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {
        mode: env.prod ? "production" : "development",
        entry: "./src/index.tsx",
        output: {
            filename: "[contenthash].bundle.js",
            chunkFilename: "[contenthash].chunk.js",
            path: path.resolve(process.cwd(), "../dist"),
            clean: true,
        },
        target: "web",
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "@": path.resolve(__dirname, "src"),
                assets: path.resolve(__dirname, "assets"),
            },
        },
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, "./dist"),
            compress: true,
            hot: true,
            port: 8080,
            proxy: [
                {
                    context: ["/api"],
                    target: "http://localhost:5050",
                    changeOrigin: true,
                    secure: false,
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                base: "/",
                scriptLoading: "defer",
            }),
            new MiniCSSExtractPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: [
                        path.resolve(__dirname, "node_modules"),
                    ],
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.s?css/,
                    use: [
                        env.prod ? MiniCSSExtractPlugin.loader : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    auto: /(?<!\.global)\.s?css$/i,
                                    mode: (resourcePath) =>
                                        /\.global/i.test(resourcePath)
                                            ? "global"
                                            : "local",
                                    namedExport: true,
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                        }
                    ],
                },
                {
                    test: /\.(jpg|jpeg|gif|png)/,
                    type: "asset/resource",
                    generator: {
                        filename: "static/img/[hash][ext]",
                    },
                },
                {
                    test: /\.(ttf|woff|woff2|otf)/,
                    type: "asset/resource",
                    generator: {
                        filename: "static/fonts/[hash][ext]",
                    },
                },
                {
                    test: /\.svg/,
                    type: "asset/inline",
                },
            ],
        },
    };
};
