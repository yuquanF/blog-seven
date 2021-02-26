<template>
  <div id="post">
    <div
      class="information"
      :style="{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${$page.frontmatter.banner})`,
      }"
    >
      <div class="content">
        <div class="main">
          <router-link v-if="$page.categoryText" :to="`/${$page.category}/`" class="category">
            {{ $page.categoryText }}
          </router-link>
          <p>{{ $page.title }}</p>
        </div>
        <div class="fringe">
          <a-tooltip v-if="$lang === 'zh-CN'" placement="top" class="word-count">
            <template slot="title">
              <span>{{ $l('wordCount') }}{{ $page.wordCount }}</span>
            </template>
            <a-icon type="clock-circle" />
            {{ getReadingTime }}
          </a-tooltip>
        </div>
      </div>
      <Bubbles v-if="isBubbles" :options="bubbles" />
    </div>
    <div class="wrapper">
      <Markdown />
      <div class="end">
        <div class="copyright">
          <a-tooltip placement="topRight" style="float: left">
            <template slot="title">
              <span>{{ getCopyright }}</span>
            </template>
            <a-button type="link">
              <a-icon type="copyright" />
              {{ $l('copyright') }}
            </a-button>
          </a-tooltip>
          <a-tooltip placement="topLeft" style="float: right">
            <template slot="title">
              <span
                >{{ $l('created') }}<br />{{ $page.frontmatter.created }}<br />{{ $l('updated') }}<br />{{
                  $page.frontmatter.updated
                }}</span
              >
            </template>
            <a-button type="link">
              <a-icon type="calendar" />
              {{ $page.frontmatter.updated }}
            </a-button>
          </a-tooltip>
        </div>
        <TagCloud :tag-list="$page.frontmatter.tags" />
      </div>
    </div>
    <div v-if="getCatalogs.length" class="catalog">
      <a-button type="primary" shape="circle" icon="ordered-list" size="large" @click="catalog.visible = true" />
      <a-drawer
        placement="left"
        :width="336"
        :title="$page.title"
        :closable="false"
        :visible="catalog.visible"
        @close="catalog.visible = false"
      >
        <a-anchor :affix="false" :bounds="200" :wrapper-style="{ maxHeight: 'auto' }">
          <a-anchor-link
            v-for="(catalog, index) in getCatalogs"
            :key="index"
            :href="`#${catalog.slug}`"
            :title="catalog.title"
          >
            <template v-if="hasOwn(catalog, 'children') && catalog.children.length">
              <a-anchor-link
                v-for="(child, index) in catalog.children"
                :key="index"
                :href="`#${child.slug}`"
                :title="child.title"
              />
            </template>
          </a-anchor-link>
        </a-anchor>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import Markdown from '@theme/components/Markdown'
import TagCloud from '@theme/components/TagCloud'
import Bubbles from '@theme/components/Bubbles'

export default {
  name: 'Post',
  components: { Markdown, TagCloud, Bubbles },
  data() {
    return {
      catalog: {
        visible: false,
      },
      isBubbles: false,
      bubbles: {},
    }
  },
  computed: {
    getCatalogs() {
      const headers = this.$page.headers
      const catalog = []
      if (headers && headers.length > 0) {
        headers.forEach(header => {
          if (header.level === 2) {
            catalog.push(header)
          } else {
            const catalogsLen = catalog.length
            if (catalogsLen > 0) {
              if (!this.hasOwn(catalog[catalogsLen - 1], 'children')) {
                catalog[catalogsLen - 1].children = []
              }
              if (catalog[catalogsLen - 1].children.length > 0) {
                let canPush = true
                catalog[catalogsLen - 1].children.forEach(e => {
                  if (e.slug === header.slug) {
                    canPush = false
                  }
                })
                if (canPush) {
                  catalog[catalogsLen - 1].children.push(header)
                }
              } else {
                catalog[catalogsLen - 1].children.push(header)
              }
            }
          }
        })
      }
      return catalog
    },
    getReadingTime() {
      const wordCount = this.$page.wordCount
      if (wordCount < 600) {
        return `${this.$l('wordCountMin')}${this.$l('wordCountUnit')}`
      } else {
        return `${this.$l('wordCountMax')}${Math.ceil(wordCount / 600)}${this.$l('wordCountUnit')}`
      }
    },
    getCopyright() {
      return this.$page.copyright || this.$l('copyrightStatement')
    },
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const { post } = this.$themeConfig
      if (post) {
        const { bubbles } = post
        if (bubbles) {
          this.isBubbles = true
          if (typeof bubbles === 'object') {
            this.bubbles = bubbles
          }
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/variable.less';

#post {
  margin: auto;
  margin-top: 64px;
  padding: 0 24px;
  width: 100%;
  max-width: 1200px;

  .information {
    position: relative;
    margin-top: 36px;
    margin-bottom: 36px;
    padding: 40px 80px;
    width: 100%;
    height: 350px;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    z-index: 1;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 270px;
      color: #ffffff;

      .main {
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .category {
          position: relative;
          text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
          opacity: 0.75;
          color: #ffffff;
          font-size: 16px;
          width: fit-content;

          &::after {
            position: absolute;
            content: '';
            display: block;
            left: 0;
            bottom: -8px;
            height: 1px;
            width: 100%;
            background: currentColor;
            opacity: 0.3;
          }
        }

        p {
          margin-top: 20px;
          font-weight: 400;
          font-size: 28px;
          text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
          color: inherit;
        }
      }

      .fringe {
        display: flex;
        flex-direction: row;
        height: 20px;
        line-height: 20px;
        color: #bdbdbd;
        font-size: 13px;

        .word-count {
          cursor: pointer;
        }
      }
    }
  }

  .wrapper {
    background: #98d1f233;
    padding: 28px;

    .end {
      margin-top: 60px;

      .copyright {
        position: relative;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #eff2f7;

        .ant-btn {
          padding: 0;
          color: #a3aab1;
        }
      }

      #tag-cloud {
        background-color: inherit;
      }
    }
  }

  .catalog {
    position: fixed;
    right: 20px;
    bottom: 140px;
    border-radius: 20px;
    box-shadow: 0 3px 12px darken(@primary-color, 1%);
    background-color: @primary-color;
    z-index: 10;

    & > .ant-btn {
      &:hover,
      &:focus {
        background-color: @primary-color;
        border-color: @primary-color;
      }
    }
  }
}

@media only screen and (max-width: 992px) {
  #post {
    .information {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 30px 60px;
      height: 300px;

      .content {
        height: 240px;

        .main {
          height: 220px;

          p {
            font-size: 26px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  #post {
    .information {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 20px;
      height: 240px;

      .content {
        align-items: center;
        height: 200px;
        text-align: center;

        .main {
          align-items: center;
          height: 180px;

          p {
            font-size: 20px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  #post {
    padding: 0;
    .information {
      .content {
        .main {
          .category {
            font-size: 14px;
          }

          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
