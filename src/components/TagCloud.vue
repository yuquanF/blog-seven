<template>
  <div id="tag-cloud">
    <div class="wrapper">
      <div v-if="tags.length">
        <Router-link v-for="(tag, index) in tags" :key="index" :to="`/tags/${tag}`">
          <a-tag class="tag">
            {{ tag }}
          </a-tag>
        </Router-link>
      </div>
      <a-tag v-else class="tag no-tag">
        {{ $l('noTags') }}
      </a-tag>
    </div>
  </div>
</template>

<script>
import { shuffle } from '@theme/utils'

export default {
  name: 'TagCloud',
  props: {
    tagList: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    tags() {
      const { tagSize = 60 } = this.$themeConfig
      if (this.tagList) {
        return this.tagList
      } else {
        if (this.$routePage === 'tags') {
          return shuffle(Object.keys(this.$tags))
        } else {
          return shuffle(Object.keys(this.$tags).slice(0, tagSize))
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
#tag-cloud {
  background-color: #fafafa;

  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 36px 60px 60px 60px;
    text-align: center;

    .tag {
      position: relative;
      margin: 12px 6px 0 6px;
      padding: 0 12px;
      height: 38px;
      line-height: 38px;
      border: none;
      border-radius: 8px;
      box-shadow: 0 13px 15px rgba(0, 0, 0, 0.1);
      color: #738192;
      background-color: #ffffff;
      transition: 0.25s;

      &:hover {
        transform: translateY(6px);
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
      }
    }

    .no-tag {
      transform: translateY(6px);
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
    }
  }
}

@media only screen and (max-width: 767px) {
  #tag-cloud {
    .wrapper {
      padding: 18px 20px 30px 20px;
    }
  }
}
</style>
