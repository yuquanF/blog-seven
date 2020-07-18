const settings = require('../../../settings')
const links = require('./links')

module.exports = {
  lang: 'zh-CN', // en zh-CN
  // logo: '',
  // banner: '',
  // author: '',
  // authorLink: '',
  // avatar: '',
  // social: {
  //   github: '',
  //   facebook: '',
  //   twitter: '',
  //   dribbble: '',
  //   weibo: '',
  //   zhihu: '',
  //   qq: '',
  // },
  locales: {
    title: '人间值得',
    description: '书写生活与你',
  },
  navs: [
    {
      text: '编程技术',
      link: '/program/',
    },
    {
      text: '生活兴趣',
      link: '/life/',
    },
    {
      text: '软件工具',
      link: '/tool/',
    },
    {
      text: '其它',
      link: '/other/',
    },
  ],
  nameplate: {
    title: 'Jyyiii',
  },
  buttons: [
    {
      text: '阅读列表',
      link: '/posts/',
      type: 'primary',
    },
    {
      text: '了解作者',
      link: '/about.html',
      type: 'default',
    },
  ],
  footer: {
    one: [
      {
        title: 'Yur',
        subtitle: 'VuePress 主题',
        link: 'https://github.com/cnguu/vuepress-theme-yur',
      },
    ],
    two: [
      {
        title: '--备案号占用--',
        link: 'http://beian.miit.gov.cn',
        type: 'flag',
        theme: 'filled',
      },
    ],
    three: [
      {
        title: 'QQ：420125423',
        link: 'http://wpa.qq.com/msgrd?v=3&uin=420125423&site=qq&menu=yes',
        type: 'qq',
        theme: 'outlined',
      },
    ],
  },
  post: {
    bubbles: true,
    pageSize: 12,
    pageSizeOptions: ['12', '24', '48', '96'],
  },
  timeline: true,
  // links,
  file: true,
  about: true,
  discuss: 'valine',
  valine: {
    appId: settings.valineAppId,
    appKey: settings.valineAppKey,
    placeholder: '在这里写下你的留言丨支持 MarkDown 语法',
    notify: false,
    verify: true,
    avatar: 'mp',
    pageSize: 8,
    recordIP: true,
    lang: 'zh-cn',
  },
  // search: {
  //   type: 'default',
  //   size: 10,
  // },
  // crisp: '',
  // tagSize: 100,
  // baiDu: {
  //   tongJi: '',
  //   autoPush: true,
  //   pinYin: true,
  // },
  // curtain: {
  //   tip: '页面准备中...',
  //   textShadow: '#e91e63',
  // },
  dark: true,
  // cdn: '',
}
