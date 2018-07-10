const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");

const isProd = process.env.NODE_ENV === "production";
const postCss = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer({
        browsers: ["last 10 versions"],
        cascade: true
      })
    ],
    sourceMap: true
  }
};

const cssDev = [
  { 
    loader: "style-loader" 
  },
  {
    loader: "css-loader",
    options: {
      sourceMap: true
    }
  },
  postCss,
  {
    loader: "sass-loader",
    options: {
      sourceMap: true
    }
  }
];
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: [
    {
      loader: "css-loader",
      options: {
        sourceMap: true
      }
    },
    postCss,
    {
      loader: "sass-loader",
      options: {
        sourceMap: true
      }
    }
  ],
  publicPath: "/build"
});
let cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          "pug-loader",
          "pug-html-loader?pretty&exports=false?exports=false"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "fonts/",
            outputPath: "fonts/"
          }
        }
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "jonPack - Главная",
      hash: true,
      minify: false,
      filename: "index.html",
      template: "./src/index.pug"
    }),
    new HtmlWebpackPlugin({
      title: "jonPack - Портфолио",
      hash: true,
      minify: false,
      filename: "portfolio.html",
      template: "./src/portfolio.pug"
    }),
    new HtmlWebpackPlugin({
      title: "jonPack - Услуги",
      hash: true,
      minify: false,
      filename: "services.html",
      template: "./src/services.pug"
    }),
    new HtmlWebpackPlugin({
      title: "jonPack - Контакты",
      hash: true,
      minify: false,
      filename: "contact.html",
      template: "./src/contact.pug"
    }),
    new HtmlWebpackPlugin({
      title: "jonPack - Контакты",
      hash: true,
      minify: false,
      filename: "order.html",
      template: "./src/order.pug"
    }),
    new HtmlWebpackHarddiskPlugin(),
    new CopyWebpackPlugin([{ from: "src/img", to: "img" }]),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    watchContentBase: true,
    compress: true,
    port: 3000,
    hot: false,
    stats: "errors-only",
    open: true,
    inline: false
  }
};
