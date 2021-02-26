<template>
  <div id="about">
    <div ref="author" class="author">
      <div class="wrapper">
        <img :src="avatar" :alt="$l('title')" />
        <h1>{{ author }}</h1>
      </div>
    </div>
    <div class="readme">
      <Markdown v-show="readme" ref="markdown" />
    </div>
    <Discuss />
  </div>
</template>

<script>
import Markdown from '@theme/components/Markdown'
import Discuss from '@theme/components/Discuss'

export default {
  name: 'About',
  components: { Markdown, Discuss },
  data() {
    return {
      readme: true,
      avatar: require('@theme/assets/logo144.png'),
      author: 'yuquanf',
      authorLink: 'https://github.com/yuquanF',
      social: {},
    }
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const { avatar, author } = this.$themeConfig
      if (avatar) {
        this.avatar = this.$withBase(avatar)
      }
      if (author) {
        this.author = author
      }
    },
  },
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 767px) {
  #about {
    padding: 0 20px;
  }
}
</style>
