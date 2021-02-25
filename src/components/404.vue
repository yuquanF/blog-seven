<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img :src="img404" alt="404" />
      </div>
      <div class="col">
        <h1>404</h1>
        <h2>UH OH! 页面丢失</h2>
        <p>您所寻找的页面不存在。你可以点击下面的按钮，返回主页。</p>
        <router-link to="/">
          <a-button type="primary">
            {{ $l('backToHomepage') }}
          </a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  data() {
    return {
      img404: require('../assets/post/404.svg'),
    }
  },
  mounted() {
    document.title = `${this.$l('404')} - ${this.$l('title')}`
  },
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 84px);
}
.row {
  display: flex;
}
.col {
  min-width: 500px;
}
</style>
