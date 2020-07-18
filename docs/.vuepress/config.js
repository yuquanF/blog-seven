const path = require('path')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const plugins = require('./config/plugins')
const settings = require('../../settings')

module.exports = {
  base: '/',
  head,
  evergreen: true,
  theme: path.resolve(__dirname, '../../src'),
  themeConfig,
  plugins,
  markdown: {
    lineNumbers: true,
  },
  host: settings.host,
  port: settings.port,
  dest: 'dist',
  extraWatchFiles: [
    '/docs/.vuepress/config.js',
  ],
}
