//@ts-check
const { resolve } = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const ReloadPlugin = require("./webpack_plugin/ReloadWebpackPlugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const Unocss = require("@unocss/webpack").default

const rootDir = resolve(__dirname)
/**
 * @type import("webpack").Configuration & { devServer: import("webpack-dev-server").Configuration}
 */
const config = {
  entry: {
    checkhost: "./src/main/insert/checkhost.ts",
    netease: "./src/main/insert/163.ts",
    background: "./src/main/background/index.ts",
    popup: "./src/main/popup/index.tsx",
  },
  mode: "production",
  output: {
    path: resolve(rootDir, "pkg"),
    filename: "js/[name].js",
    publicPath: "/",
  },
  devServer: {
    hot: false,
    liveReload: false,
    webSocketServer: false,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": resolve(rootDir, "./src"),
    },
  },
  optimization: {
    realContentHash: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // drop_console: true,
            reduce_vars: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: {
            toplevel: true,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 2048,
          name: "img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new ReloadPlugin(),
    new CleanWebpackPlugin(),
    Unocss(),
    new HtmlWebpackPlugin({
      template: resolve(rootDir, "./public/popup.html"),
      filename: resolve(rootDir, "./pkg/popup.html"),
      chunks: ["popup"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(rootDir, "./public/manifest.json"),
          to: resolve(rootDir, "./pkg/manifest.json"),
        },
      ],
    }),
  ],
}

module.exports = config
