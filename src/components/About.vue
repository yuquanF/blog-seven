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
  </div>
</template>

<script>
import Markdown from '@theme/components/Markdown'

export default {
  name: 'About',
  components: { Markdown },
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

#about {
  display: flex;
  flex-direction: column;
  align-items: center;

  .author {
    .wrapper {
      padding: 40px 0;

      img {
        width: 100%;
        max-width: 100px;
        max-height: 100px;
        border-radius: 100%;
      }

      h1 {
        color: #003a8c;
      }
    }
  }

  .readme {
    text-align: center;
  }
}
</style>
