/* global module, require, __dirname */
const path = require('path')
const fs = require('fs')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const utils = require('../utils/util')
// 导出默认的配置信息. 其他的先不管.
module.exports = {
  entry: utils.findEntry(),
  output: {
    path: path.resolve(path.dirname(__dirname), 'dist'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
    libraryTarget: 'umd'
  },
  resolve: {
    // 这里错了. 贼尴尬.
    extensions: [
      '.js', '.vue', '.json'
    ]
  },
  module: {
    rules: [
      // 指定vue文件使用vue-loader来进行解析.
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // .vue文件打包
    new VueLoaderPlugin(),
    // 直接将原始文件复制过去.
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(path.dirname(__dirname), 'src/manifest.json'), to: 'manifest.json' },
        { from: path.dirname(__dirname) + '/public', filter: async(file_path) => {
          const app_path = path.dirname(__dirname)

          if (file_path.indexOf('extension.html') > 0) {
            return false
          }

          if (file_path.indexOf('devtools.html') > 0) {
            // 如果不存在src/entry/panel和src/entry/sidebar
            if ( !fs.statSync(app_path + '/src/entry/panel').isDirectory() && !fs.statSync(app_path + '/src/entry/sidebar').isDirectory()) {
              return false
            }
          }

          return true
        } }
      ]
    })
  ].concat(utils.genHtmlPlugins()),
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })]
  }
}
