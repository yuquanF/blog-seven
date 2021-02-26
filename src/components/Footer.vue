<template>
  <footer id="footer">
    <div class="container">
      <div class="footer-wrap">
        <a-row>
          <a-col v-if="footer.one && footer.one.length" :xs="24" :sm="24" :md="8">
            <div class="footer-center">
              <h2>
                <img :src="footer.icon" :alt="$l('title')" />
                <span>{{ $l('footerColOne') }}</span>
              </h2>
              <div v-for="(item, index) in footer.one" :key="index">
                <a :href="item.link" target="_blank" rel="noopener noreferrer">
                  <span>{{ item.title }}</span>
                </a>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ item.subtitle }}</span>
              </div>
            </div>
          </a-col>
          <a-col v-if="footer.two && footer.two.length" :xs="24" :sm="24" :md="8">
            <div class="footer-center">
              <h2>
                <span>{{ $l('footerColTwo') }}</span>
              </h2>
              <div v-for="(item, index) in footer.two" :key="index">
                <a :href="item.link" target="_blank" rel="noopener noreferrer">
                  <img :src="footer.beian" alt="备案信息" />
                  <span>{{ item.title }}</span>
                </a>
              </div>
            </div>
          </a-col>
          <a-col v-if="footer.three && footer.three.length" :xs="24" :sm="24" :md="8">
            <div class="footer-center">
              <h2>
                <span>{{ $l('footerColThree') }}</span>
              </h2>
              <div v-for="(item, index) in footer.three" :key="index">
                <a :href="item.link" target="_blank" rel="noopener noreferrer">
                  <a-icon :type="item.type" :theme="item.theme" />
                  <span>{{ item.title }}</span>
                </a>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      author: 'yuquanf',
      authorLink: 'https://github.com/yuquanF/',
      footer: {
        icon: require('@theme/assets/footer.png'),
        beian: require('@theme/assets/beian.png'),
      },
    }
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const { author, authorLink, footer } = this.$themeConfig
      if (author) {
        this.author = author
      }
      if (authorLink) {
        this.authorLink = authorLink
      }
      if (footer) {
        if (this.hasOwn(footer, 'icon')) {
          footer.icon = this.$withBase(footer.icon)
        }
        this.footer = Object.assign({}, this.footer, footer)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/variable.less';

#footer {
  .container {
    position: relative;
    clear: both;
    color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
    background: #000000;

    a {
      color: rgba(255, 255, 255, 0.9);

      &:hover {
        color: @primary-color;
      }
    }

    .footer-wrap {
      position: relative;
      margin: auto;
      padding: 60px 24px;
      width: 100%;
      max-width: 1200px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);

      .ant-row {
        margin-left: -8px;
        margin-right: -8px;

        & > div {
          padding-left: 8px;
          padding-right: 8px;
        }
      }

      .footer-center {
        display: inline-block;
        text-align: center;

        & > h2 {
          position: relative;
          margin: 0 auto 24px;
          font-weight: 500;
          font-size: 16px;

          img {
            width: 27px;
            margin-right: 16px;
          }

          span {
            color: #ffffff;
          }
        }

        & > div {
          margin: 12px 0;
        }
      }
    }

    .bottom-bar {
      margin: 0;
      padding: 16px 40px;
      overflow: hidden;
      font-size: 16px;
      line-height: 32px;
      text-align: center;

      .heart {
        position: relative;
        margin: 0 30px 0 5px;
        width: 20px;
        height: 20px;

        &::before,
        &::after {
          position: absolute;
          content: '';
          left: 10px;
          top: 0;
          width: 10px;
          height: 18px;
          background: @primary-color;
          border-radius: 50px 50px 0 0;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
        }

        &::after {
          left: 0;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }
      }

      a {
        color: rgba(255, 255, 255, 0.65);

        &:hover {
          color: #ffffff;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  #footer {
    .container {
      .footer-wrap {
        padding: 40px 24px;

        .footer-center {
          text-align: center;

          & > h2 {
            margin-top: 16px;
          }
        }
      }
    }
  }
}
</style>
