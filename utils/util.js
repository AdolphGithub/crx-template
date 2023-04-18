/*global require, __dirname, module */
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function findEntry() {
  const app_path = path.dirname(__dirname)
  const sep = path.sep
  const entry_path = path.dirname(__dirname) + sep + 'src' + sep + 'entry'
  const modules = []
  const entries = {}
  const dirs = fs.readdirSync(entry_path)
  

  dirs.forEach(function(item) {
    const full_path = path.join(entry_path, item)
    const stat = fs.statSync(full_path)
    
    if (stat.isDirectory()) {
      modules.push(full_path)
    }
  })

  // 获取所有的文件夹下面所有的入口文件.
  if (modules.length <= 0) {
    return {}
  }

  modules.map(function(item) {
    const entry = fs.statSync(item + sep + 'main.js')
    if (!entry.isFile()) {
      return
    }

    const info = path.parse(item + sep + 'main.js')

    let dirname = info.dir.split(sep).pop()

    if (['panel', 'sidebar'].indexOf(dirname) > -1 ) {
      dirname = 'devtools' + sep + dirname
    }
    
    // 这里给改改. 将src/entry改为其他的形式. 头疼.
    entries[dirname] = item + sep + 'main.js'
  })
    if (fs.statSync(app_path + sep + ['', 'src', 'content.js'].join(sep)).isFile()) {
    entries['content'] = app_path + ['', 'src', 'content.js'].join(sep)
  }

  if (fs.statSync(app_path + ['', 'src','background.js'].join(sep)).isFile()) {
    entries['background'] = app_path + ['', 'src', 'background.js'].join(sep)
  }

  if (fs.statSync(app_path + ['', 'src','devtools.js'].join(sep)).isFile()) {
    entries['devtools'] = app_path + ['', 'src','devtools.js'].join(sep)
  }

  return entries
}

// 这里要做一些特殊处理才能进行打包. 对对应的sidebar, panel来进行打包. 主要是要注入代码才可以.
function genHtmlPlugins() {
  const entires = findEntry()
  const plugins = []
  const template = path.dirname(__dirname) + '/public/extension.html'
  const modules = Object.keys(entires)

  // 这里有问题. 需要重新改动一下就可以了.
  for (var index in modules) {
    const module_name = modules[index]
    const name = module_name.split('/').pop()

    if ( ['content', 'background'].indexOf(module_name) > -1 ) {
      continue
    }
    // 打包对应的模块到指定的目录.其余就不打包了.
    
    let filename = module_name + '.html'

    plugins.push(new HtmlWebpackPlugin({
      // publicPath: './devtools',
      title: name,
      template: template,
      name: name,
      filename: filename,
      chunks: [module_name],
      inject: 'body',
      minify: {
        removeComments: true // 自动删除注释
      }
    }))
  }

  return plugins
}

module.exports = {
  findEntry: findEntry,
  genHtmlPlugins: genHtmlPlugins
}
