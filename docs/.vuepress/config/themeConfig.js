const settings = require('../../../settings')

module.exports = {
  lang: 'zh-CN', // en zh-CN
  locales: {
    title: '书写生活',
    description: '书写生活',
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
        title: '黔ICP备19010380号-2',
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
      {
        title: 'github: yuquanF',
        link: 'https://www.github.com/yuquanF',
        type: 'github',
        theme: 'outlined',
      },
    ],
  },
  post: {
    bubbles: true,
    pageSize: 12,
    pageSizeOptions: ['12', '24', '48', '96'],
  },
  tags: true,
  tagSize: 100,
  timeline: true,
  file: true,
  about: true,
  search: {
    type: 'default',
    size: 10,
  },
  // crisp: '',
  // baiDu: {
  //   tongJi: '',
  //   autoPush: true,
  //   pinYin: true,
  // },
  curtain: {
    tip: '页面准备中...',
    textShadow: '#e91e63',
  },
  dark: true,
  // cdn: '',
}
