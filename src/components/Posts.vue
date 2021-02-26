<template>
  <div id="posts">
    <a-list
      class="post-list"
      item-layout="vertical"
      :pagination="pagination"
      :data-source="dataSource"
      :grid="postGrid"
      :locale="locale"
    >
      <a-list-item class="post-item" slot="renderItem" key="item.path" slot-scope="item">
        <template slot="actions">
          {{ item.frontmatter.created }}
        </template>
        <router-link slot="extra" :to="item.path">
          <div class="banner" :style="{ backgroundImage: `url(${item.frontmatter.banner})` }" />
        </router-link>
        <a-list-item-meta>
          <router-link slot="title" :to="item.path">
            {{ item.title }}
          </router-link>
        </a-list-item-meta>
        <div v-if="item.frontmatter.tags" class="tag">
          <div v-if="$routePage === 'tags'" style="height: 22px" />
          <router-link v-for="(tag, key) in item.frontmatter.tags.slice(0, 1)" v-else :key="key" :to="`/tags/${tag}`">
            <a-tag>{{ tag }}</a-tag>
          </router-link>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const paginationDefault = {
  current: 1,
  pageSize: 12,
  pageSizeOptions: ['12', '24', '48', '96'],
}

export default {
  name: 'Posts',
  data() {
    return {
      pagination: {
        onChange: (page, pageSize) => {
          this.pageChange(page, pageSize)
        },
        onShowSizeChange: (current, size) => {
          this.pageChange(1, size)
        },
        showTotal: (total, range) => {
          return `Total ${total} Posts`
        },
        current: 1,
        pageSize: 12,
        pageSizeOptions: ['12', '24', '48', '96'],
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'small',
        textAlign: 'center',
      },
      locale: {
        emptyText: 'This blogger is really lazy and has not written an article',
      },
      postGrid: {
        gutter: 24,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 2,
        xxl: 2,
      },
    }
  },
  computed: {
    dataSource() {
      if (Object.keys(this.$categories).includes(this.$routePage)) {
        return this.$categories[this.$routePage]
      } else if (Object.keys(this.$tags).includes(this.$routePost)) {
        return this.$tags[this.$routePost]
      } else {
        return this.$posts
      }
    },
  },
  watch: {
    $route(to, from) {
      const { page: toPage, pageSize: toPageSize } = to.query
      const { page: fromPage, pageSize: fromPageSize } = from.query
      if (
        toPage &&
        toPageSize &&
        fromPage &&
        fromPageSize &&
        (toPage !== fromPage || toPageSize !== fromPageSize) &&
        (this.pagination.current !== Number(toPage) || this.pagination.pageSize !== Number(toPageSize))
      ) {
        // Determine if it is a back operation
        this.pagination.current = Number(toPage)
        this.pagination.pageSize = Number(toPageSize)
        this.$router
          .push({
            query: {
              page: toPage,
              pageSize: toPageSize,
            },
          })
          .catch(() => {
            // Make vue-router happy
          })
      } else if (!toPage || !toPageSize) {
        this.pagination.current = paginationDefault.current
        this.pagination.pageSize = paginationDefault.pageSize
        this.$router.replace({
          query: {
            page: String(paginationDefault.current),
            pageSize: String(paginationDefault.pageSize),
          },
        })
      }
    },
  },
  created() {
    this.handleInit()
    this.handleQuery()
  },
  methods: {
    handleInit() {
      this.pagination.showTotal = (total, range) => {
        return `${this.$l('total')} ${total} ${this.$l('posts')}`
      }
      this.locale.emptyText = this.$l('noPosts')

      const { post } = this.$themeConfig
      if (post) {
        const { pageSize, pageSizeOptions } = post
        if (pageSize) {
          this.pagination.pageSize = Number(pageSize)
          paginationDefault.pageSize = Number(pageSize)
        }
        if (pageSizeOptions) {
          this.pagination.pageSizeOptions = pageSizeOptions
          paginationDefault.pageSizeOptions = pageSizeOptions
        }
      }
      if (!this.pagination.pageSizeOptions.includes(this.pagination.pageSize)) {
        this.pagination.pageSize = Number(this.pagination.pageSizeOptions[0])
        paginationDefault.pageSize = Number(this.pagination.pageSizeOptions[0])
      }
    },
    handleQuery() {
      if (!this.hasOwn(this.$route.query, 'page') || !this.hasOwn(this.$route.query, 'pageSize')) {
        this.$router.replace({
          query: {
            page: String(this.pagination.current),
            pageSize: String(this.pagination.pageSize),
          },
        })
      }

      const { page, pageSize } = this.$route.query
      if (page) {
        this.pagination.current = Number(page)
      }
      if (pageSize) {
        this.pagination.pageSize = Number(pageSize)
      }
    },
    pageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.$router.push({
        query: {
          page: String(this.pagination.current),
          pageSize: String(this.pagination.pageSize),
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/variable.less';

.post-list {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 40px 24px;
}

.post-item {
  margin: 0 40px 20px 0;
  padding: 15px;
  border-radius: 14px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.6s;

  &:hover {
    box-shadow: 0 10px 14px rgba(0, 0, 0, 0.15);
  }
}

.ant-list-item-main {
  .ant-list-item-meta-title {
    font-size: 18px;

    a {
      color: #314659;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .ant-tag {
    margin-right: 0;
    color: @primary-color;
    border-color: @primary-color-1;
    background-color: @primary-color-1;
  }

  .ant-list-item-action {
    li {
      margin-left: 4px;
      padding: 0;
      cursor: auto;
    }
  }
}

.ant-list-item-extra {
  .banner {
    border-radius: 8px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    cursor: pointer;
    width: 150px;
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 8px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: linear-gradient(to right, transparent, #fff, transparent);
    transition: all 300ms;
  }

  &:hover {
    &::before {
      left: 100%;
    }
  }
}

@media screen and (max-width: 480px) {
  .post-list {
    padding: 10px;
  }
}

@media screen and (min-width: 1200px) {
  .post-list {
    padding-left: 180px;
  }

  .ant-col-xl-12 {
    width: 45%;
  }
}
</style>
