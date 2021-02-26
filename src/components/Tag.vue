<template>
  <div id="tag">
    <div class="wrapper">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <Router-link to="/tags">
            <a-icon type="tags" />
          </Router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>{{ $routePost }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <Posts />
  </div>
</template>

<script>
import Posts from '@theme/components/Posts'

export default {
  name: 'Tag',
  components: { Posts },
}
</script>

<style lang="less" scoped>
#tag {
  margin: 0 auto;
  padding: 24px;
  width: 100%;
  max-width: 1200px;

  .wrapper {
    text-align: center;
  }
}

@media screen and (max-width: 480px) {
  #tag {
    padding: 24px 0px;
  }
}
</style>
