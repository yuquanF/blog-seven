const settings = require('../../../settings')

module.exports = [
  'serve',
  ['@vssue/vuepress-plugin-vssue', {
    platform: 'github',
    owner: 'yuquanF',
    repo: 'blog-vssue',
    clientId: settings.clientID,
    clientSecret: settings.clientSecret,
  }],
]
