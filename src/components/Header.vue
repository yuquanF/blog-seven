<template>
  <header id="header">
    <div class="container">
      <a-popover v-model="visible" trigger="click" placement="rightBottom">
        <template slot="content">
          <div id="menu-mobile">
            <div v-show="$routePage !== 'search'" class="search" @click="handleMore">
              <a-icon type="search" />
            </div>
            <a-menu v-model="currentPage" mode="inline" class="menu">
              <a-sub-menu v-if="$navs.length" key="category">
                <span slot="title">{{ $l('category') }}</span>
                <a-menu-item-group>
                  <a-menu-item v-for="nav in $navs" :key="nav.key" @click="changeVisible">
                    <a v-if="$route.path === nav.link" href="javascript:;">
                      {{ nav.text }}
                    </a>
                    <router-link v-else :to="nav.link">
                      {{ nav.text }}
                    </router-link>
                  </a-menu-item>
                </a-menu-item-group>
              </a-sub-menu>
              <a-menu-item v-show="tags" key="tags" @click="changeVisible">
                <router-link to="/tags.html">
                  {{ $l('tags') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="timeline" key="timeline" @click="changeVisible">
                <router-link to="/timeline.html">
                  {{ $l('timeline') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="links" key="links" @click="changeVisible">
                <router-link to="/links.html">
                  {{ $l('links') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="file" key="file" @click="changeVisible">
                <router-link to="/file.html">
                  {{ $l('file') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="about" key="about" @click="changeVisible">
                <router-link to="/about.html">
                  {{ $l('about') }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </div>
        </template>
        <a-icon type="align-right" class="menu-icon" />
      </a-popover>
      <a-row>
        <a-col :xxl="4" :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
          <router-link class="logo" to="/">
            <img :src="logo" :alt="$l('title')" />
            <svg
              v-if="nameplate"
              :width="nameplate.width"
              :height="nameplate.height"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <text
                  v-for="(item, index) in nameplate.text"
                  :key="index"
                  :x="item.x"
                  :y="item.y"
                  :font-size="item.fontSize"
                  :text-anchor="item.textAnchor"
                  :text-transform="item.textTransform"
                  :text-shadow="item.textShadow"
                  :fill="item.fill"
                  :stroke="item.stroke"
                  :stroke-width="item.strokeWidth"
                  :stroke-dasharray="item.strokeDasharray"
                >
                  {{ nameplate.title }}
                  <animate
                    :attributeName="item.animate.attributeName"
                    :begin="item.animate.begin"
                    :dur="item.animate.dur"
                    :from="item.animate.from"
                    :to="item.animate.to"
                    :repeatCount="item.animate.repeatCount"
                  />
                </text>
              </g>
            </svg>
          </router-link>
        </a-col>
        <a-col :xxl="20" :xl="19" :lg="19" :md="19" :sm="0" :xs="0">
          <div v-show="$routePage !== 'search'" class="search">
            <a-icon class="search-icon" type="search" />
            <a-auto-complete
              class="search-input"
              dropdown-class-name="search-dropdown"
              :placeholder="$l('search')"
              :allow-clear="true"
              option-label-prop="value"
              :dropdown-match-select-width="false"
              :default-active-first-option="false"
              :open="searchOpen"
              @focus="searchOpen = true"
              @blur="searchOpen = false"
              @search="handleSearch"
            >
              <template slot="dataSource">
                <a-select-opt-group v-for="group in searchSource" :key="group.key" class="select-group">
                  <span slot="label" class="group-title">
                    {{ group.title }}
                  </span>
                  <template v-if="group.title === $l('tags')">
                    <a-select-option
                      v-for="opt in group.children"
                      :key="opt.key"
                      :value="searchKeyword"
                      class="select-option-tag"
                    >
                      <router-link :to="opt.path">
                        <a-tag>
                          {{ opt.title }}
                        </a-tag>
                      </router-link>
                    </a-select-option>
                  </template>
                  <template v-else>
                    <a-select-option
                      v-for="opt in group.children"
                      :key="opt.key"
                      :value="searchKeyword"
                      class="select-option"
                    >
                      <router-link :to="opt.path">
                        {{ opt.title }}
                      </router-link>
                    </a-select-option>
                  </template>
                </a-select-opt-group>
                <a-select-option v-if="searchSource.length === 0" key="v-search-empty" class="search-empty" disabled>
                  <a-empty />
                </a-select-option>
                <a-select-option key="v-search-more" :value="searchKeyword" class="search-more">
                  <div class="text" @click="handleMore">
                    {{ $l('more') }}
                  </div>
                </a-select-option>
              </template>
            </a-auto-complete>
          </div>
          <div class="navigation">
            <a-menu v-model="currentPage" mode="horizontal" class="menu">
              <a-sub-menu v-if="$navs.length" key="category">
                <span slot="title">
                  {{ $l('category') }}
                  <a-icon type="caret-down" class="category-icon" />
                </span>
                <a-menu-item-group>
                  <a-menu-item v-for="nav in $navs" :key="nav.key">
                    <a v-if="$route.path === nav.link" href="javascript:;">
                      {{ nav.text }}
                    </a>
                    <router-link v-else :to="nav.link">
                      {{ nav.text }}
                    </router-link>
                  </a-menu-item>
                </a-menu-item-group>
              </a-sub-menu>
            </a-menu>
            <a-menu v-model="currentPage" mode="horizontal" class="menu">
              <a-menu-item v-show="tags" key="tags">
                <router-link to="/tags.html">
                  {{ $l('tags') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="timeline" key="timeline">
                <router-link to="/timeline.html">
                  {{ $l('timeline') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="links" key="links">
                <router-link to="/links.html">
                  {{ $l('links') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="file" key="file">
                <router-link to="/file.html">
                  {{ $l('file') }}
                </router-link>
              </a-menu-item>
              <a-menu-item v-show="about" key="about">
                <router-link to="/about.html">
                  {{ $l('about') }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </div>
        </a-col>
      </a-row>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      visible: false,
      title: 'VuePress Theme Yur',
      logo: require('@theme/assets/logo64.png'),
      nameplate: {
        title: 'Jyyiii',
        width: '42px',
        height: '32px',
        text: [
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#3498db',
            textShadow: '0 0 1px #3498db',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-1.5s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#f39c12',
            textShadow: '0 0 1px #f39c12',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-3s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#e74c3c',
            textShadow: '0 0 1px #e74c3c',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-4.5s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#9b59b6',
            textShadow: '0 0 1px #9b59b6',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-6s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
        ],
      },
      tags: false,
      timeline: false,
      links: false,
      file: false,
      about: false,
      searchOpen: false,
      searchKeyword: '',
      searchSource: [],
      search: {
        type: 'default',
        size: 10,
      },
      currentPage: ['/'],
    }
  },
  watch: {
    $route(to, from) {
      this.currentPage = [this.$routePage]
    },
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const { logo, tags, timeline, links, file, about, search, nameplate } = this.$themeConfig
      if (logo) {
        this.logo = this.$withBase(logo)
      }
      if (nameplate) {
        this.nameplate = Object.assign({}, this.nameplate, nameplate)
      } else {
        this.nameplate = null
      }
      if (tags) {
        this.tags = true
      }
      if (timeline) {
        this.timeline = true
      }
      if (links) {
        this.links = true
      }
      if (file) {
        this.file = true
      }
      if (about) {
        this.about = true
      }
      if (search) {
        this.search = Object.assign({}, this.search, search)
      }
      this.currentPage = [this.$routePage]
    },
    changeVisible() {
      this.visible = false
    },
    handleMore() {
      this.visible = false
      this.searchOpen = false
      this.$router.push({
        path: '/search.html',
        query: { keyword: this.searchKeyword },
      })
    },
    handleSearch(value) {
      this.searchKeyword = ''
      this.searchSource = []
      value = value.trim().toLowerCase()
      if (!value) {
        return false
      }
      this.searchKeyword = value

      const { pages } = this.$site
      const matchTitle = item => item.title && item.title.toLowerCase().indexOf(value) > -1
      const matchTag = item => item.toLowerCase().indexOf(value) > -1
      const res = []
      const posts = {
        title: this.$l('posts'),
        key: 'v-group-posts',
        children: [],
      }
      const tags = {
        title: this.$l('tags'),
        key: 'v-group-tags',
        children: [],
      }

      let counter = 0
      for (let i = 0; i < pages.length; i++) {
        if (posts.children.length >= this.search.size) break

        const p = pages[i]
        if (this.isCurrentPage(p.path)) continue

        if (matchTitle(p)) {
          posts.children.push({
            title: p.title,
            path: p.path,
            key: `v-${counter}`,
          })
          counter += 1
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (posts.children.length >= this.search.size) break

            const h = p.headers[j]
            if (matchTitle(h)) {
              posts.children.push({
                title: `${p.title} #${h.title}`,
                path: `${p.path}#${h.slug}`,
                key: `v-${counter}`,
              })
              counter += 1
            }
          }
        }

        if (p.frontmatter && p.frontmatter.tags && p.frontmatter.tags.length) {
          p.frontmatter.tags.forEach(tag => {
            if (matchTag(tag) && !tags.children.find(item => item.title === tag)) {
              tags.children.push({
                title: tag,
                path: `/tags/${tag}`,
              })
            }
          })
        }
      }
      if (posts.children.length) {
        res.push(posts)
      }
      if (tags.children.length) {
        res.push(tags)
      }
      this.searchSource = res
    },
    isCurrentPage(path) {
      const index = path.indexOf('#')
      if (index === -1) {
        return path === this.$route.path
      } else {
        return path.substring(0, index) === this.$route.path
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/variable.less';

#header {
  line-height: 64px;
  background-color: #ffffff;

  .container {
    position: fixed;
    top: 0;
    z-index: 100;
    margin: 0 auto;
    width: 100%;
    background-color: #ffffffe3;
    display: flex;
    justify-content: center;

    .menu-icon {
      display: none;
      position: absolute;
      top: 25px;
      right: 30px;
      cursor: pointer;
      z-index: 1;
    }

    .logo {
      height: 64px;
      line-height: 64px;

      img {
        height: 32px;

        & + svg {
          position: relative;
          top: 20px;
        }
      }
    }

    .search {
      float: left;
      margin: 22px auto 0;
      padding-left: 16px;
      height: 24px;
      line-height: 24px;
      border-left: 1px solid #ebedf0;
      margin-right: 200px;

      .search-icon {
        position: relative;
        color: #ced4d9;
        top: -3px;
      }

      .search-input {
        top: -4px;
        direction: ltr;

        input {
          position: relative;
          border: 0;
          box-shadow: none;
          background: inherit;
        }
      }
    }

    .navigation {
      display: flex;
      margin: 11px auto 0;
      height: 11px;
      line-height: 11px;

      .menu {
        display: inline-block;
        border-bottom: none;
        background: inherit;

        .category-icon {
          margin-left: 10px;
        }
      }
    }
  }
}

#menu-mobile {
  .search {
    padding: 10px 24px;
  }

  .menu {
    min-width: 260px;
    border-right: none;
  }
}

.search-dropdown {
  .select-group {
    border-bottom: 1px solid #f6f6f6;

    .group-title {
      font-size: 14px;
    }

    .select-option {
      background-color: inherit;

      a {
        display: block;
        color: inherit;
        font-weight: normal;
      }

      &:hover {
        background-color: @primary-color-1;

        a {
          color: @primary-color-5;
        }
      }
    }

    .select-option-tag {
      display: inline-block;
      margin-left: 20px;
      padding: 0;
      background-color: inherit;

      div {
        margin-right: 20px;

        &:hover {
          color: @primary-color;
          border-color: @primary-color-4;
          background-color: @primary-color-1;
        }
      }
    }
  }

  .search-empty {
    background-color: inherit;
  }

  .search-more {
    background-color: inherit;
    text-align: center;

    .text {
      display: block;
      font-size: 13px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.45);
      transition: 0.25s;

      &:hover {
        color: @primary-color-5;
      }
    }
  }
}

@media only screen and (max-width: 1400px) {
  #header {
    .container {
      .search {
        margin-right: 100px;
      }
    }
  }
}

@media only screen and (max-width: 1200px) {
  #header {
    .container {
      .search {
        margin-right: 50px;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  #header {
    .container {
      justify-content: center;

      .search {
        margin-right: 0px;
      }

      .ant-col-md-5 {
        width: 12%;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  #header {
    .container {
      display: flex;
      justify-content: start;
      padding-left: 30px;

      .menu-icon {
        display: block;
      }

      .ant-col-md-5 {
        width: 100%;
      }
    }
  }
}
</style>
