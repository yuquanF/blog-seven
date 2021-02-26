<template>
  <div id="home">
    <div id="top" class="content-block header-wrapper">
      <div class="header-wrapper-inner">
        <section class="center">
          <!-- <div class="slogan">
            人间值得
          </div> -->
          <div class="secondary-slogan">
            书写生活
          </div>
        </section>
        <section class="arrow">
          <a id="scrollToContent" href="#">
            <img src="../assets/arrow_down.png" />
          </a>
        </section>
      </div>
    </div>
    <!-- top -->
    <div class="post">
      <div class="wrapper">
        <h2>
          <span>{{ $l('newest') }}</span>
        </h2>
        <a-row v-if="$postsByUpdated.length" class="row">
          <a-col v-for="{ path, frontmatter, title } in $postsByUpdated.slice(0, 3)" :key="path" :xs="24" :md="8">
            <router-link :to="path">
              <div class="banner">
                <div class="img" :style="{ backgroundImage: `url(${frontmatter.banner})` }" />
              </div>
              <h3>
                <span>{{ title }}</span>
              </h3>
            </router-link>
          </a-col>
        </a-row>
      </div>
    </div>
    <TagCloud />
  </div>
</template>

<script>
import TagCloud from '@theme/components/TagCloud'

export default {
  name: 'Home',
  components: { TagCloud },
}
</script>

<style lang="less" scoped>
@import '../styles/variable.less';

#top {
  position: relative;
  padding: 0 !important;
}

#top.header-wrapper {
  background: url(../assets/header-bg2.jpg) no-repeat center center;
  background-size: cover;
  display: table;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
}

@media screen and (max-width: 767px) and (orientation: landscape) {
  #top.header-wrapper {
    height: auto;
    min-height: 100vh;
    padding: 0px;
  }
}

@media screen and (max-width: 767px) {
  #top.header-wrapper {
    height: 50vh;
    padding: 0px;
  }
}

#top.header-wrapper .header-wrapper-inner {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

#top .logo,
#top .toggleDrawer {
  font-family: 'Alegreya SC';
  color: white;
}

#top .slogan {
  font-size: 4em;
  margin-bottom: 15px;
  line-height: 1em;
  font-family: 'Nixie One';
  color: white;
}

#top .secondary-slogan {
  font-size: 1.6em;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1em;
  font-family: 'Alegreya SC';
  bottom: 20%;
  position: absolute;
  width: 100%;
}

#top .arrow {
  bottom: 10%;
  display: block;
  position: absolute;
  width: 100%;
  z-index: 3;
}
#top .arrow a img {
  width: 50px;
}
#top .arrow a {
  opacity: 0.7;
}
#top .arrow a:hover {
  opacity: 1;
}

#home {
  position: relative;

  .ityped-cursor {
    font-size: 20px;
    opacity: 1;
    animation: ityped 0.3s infinite;
    animation-direction: alternate;
  }

  & > .banner {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 540px;
    margin: auto;
    padding: 0 24px;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    .img-wrapper {
      width: 50%;
      max-width: 500px;

      img {
        width: 100%;
        max-height: 500px;
      }
    }

    .text-wrapper {
      padding: 0 24px 0 0;
      flex: 1;

      .title-line-wrapper {
        width: 100%;
        max-width: 500px;
        height: 2px;
        overflow: hidden;

        .title-line {
          width: 64px;
          height: 100%;
          background: linear-gradient(90deg, fade(@primary-color, 0) 0, @primary-color);
          transform: translateX(-64px);
          animation: bannerTitleLine 3s ease-in-out 0s infinite;
        }
      }

      .title {
        margin: 8px 0 28px;
        font-weight: 600;
        font-size: 48px;
        line-height: 56px;
        letter-spacing: 0;
      }

      .description-wrapper {
        color: #314659;
        font-size: 20px;
        line-height: 40px;
      }

      .banner-btn-group {
        a {
          margin-left: 16px;

          button {
            height: 40px;
            padding: 0 24px;
            font-size: 16px;
            line-height: 38px;
            border-radius: 100px;
          }

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }

  .post {
    background: linear-gradient(to top, @primary-color 0%, lighten(@primary-color, 20%) 100%);
    margin-top: -48px;

    .wrapper {
      width: 100%;
      max-width: 1200px;
      margin: auto;
      padding: 0 24px;

      h2 {
        margin: 50px 0 0 0;
        padding: 30px 0;
        color: #d47f0c;
        font-weight: 400;
        font-size: 30px;
        line-height: 50px;
        text-align: center;
      }

      .row {
        & > div {
          margin: 20px 0 30px 0;
          text-align: center;

          .banner {
            width: 200px;
            height: 200px;
            margin: auto;
            line-height: 1.5;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);

            .img {
              width: 100%;
              height: 100%;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center center;
            }
          }

          h3 {
            margin-top: 30px;
            padding: 0 24px;
            color: #ffffff;
            font-weight: 400;
            font-size: 20px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  #home {
    & > .banner {
      padding: 24px;
      height: auto;
      flex-direction: column;

      .img-wrapper {
        margin-bottom: 20px;
      }

      .text-wrapper {
        text-align: center;
        padding: 0;

        .title {
          margin: 8px 0;
          font-size: 30px;
          font-weight: 500;
        }

        .description-wrapper {
          font-size: 16px;
          line-height: 32px;
        }

        .banner-btn-group {
          a {
            button {
              height: 32px;
              padding: 0 12px;
              font-size: 14px;
              line-height: 30px;
            }
          }
        }
      }
    }

    .post {
      margin-top: 0;
      .wrapper {
        h2 {
          margin-top: 10px;
          padding: 15px 0;
          font-size: 24px;
        }

        .row {
          & > div {
            margin: 10px 0;

            .banner {
              width: 150px;
              height: 150px;
            }

            h3 {
              margin-top: 10px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
