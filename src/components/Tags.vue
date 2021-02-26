<template>
  <div id="tags">
    <TagCloud />
  </div>
</template>

<script>
import TagCloud from '@theme/components/TagCloud'

export default {
  name: 'Tags',
  components: { TagCloud },
}
</script>

<style lang="less" scoped>
#tags {
  margin: 0 auto;
  padding: 0 24px 24px;
  width: 100%;
  max-width: 1200px;
  text-align: center;

  #tag-cloud {
    background-color: #ffffff;
  }
}
</style>
