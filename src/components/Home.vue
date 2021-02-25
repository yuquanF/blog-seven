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
</style>
