var webpack = require('webpack'),
path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: ['./index.js', './scss/main.scss'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: "[id].js"
  },
  module: {
        rules: [
          {
              test: /\.js$/,
              include: path.resolve(__dirname, 'src'),
              exclude: /node_modules/,
				      loader: "babel-loader"
          },
          {
            test: /\.scss$/,
            use: extractSass.extract({
              use: [{
                   loader: "css-loader"
                  }, {
                   loader: "sass-loader",
                   options: {
                       includePaths: ["scss"]
                     }
                   }
               ]
            })
         }
        //   {
        //       test: /\.scss$/,
        //       loader: ExtractTextPlugin.extract(
        //             'style', // The backup style loader
        //             'css?sourceMap!sass?sourceMap'
        //       )
        //       // include: path.resolve(__dirname, 'scss'),
        //       // use: [
        //       //   'style-loader',
        //       //   'css-loader',
        //       //   'sass-loader'
        //       // ]
        // }
      ]
    },
    plugins: [
      new ExtractTextPlugin({ // define where to save the file
        filename: 'dist/[name].bundle.css',
        allChunks: true,
      }),
    ]
}
