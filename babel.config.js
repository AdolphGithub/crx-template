// babel.config.js
/* global module */
const presets = []
const plugins = [
  [
    'import',
    {
      'libraryName': 'vant',
      'libraryDirectory': 'es',
      'style': true
    }
  ]
]

module.exports = {
  plugins,
  presets
}