<template>
  <div id="links">
    <div class="content">
      <div v-for="(item, index) in links" :key="index" class="wrapper">
        <div v-show="index !== 0" class="hr" />
        <div class="name">
          <section />
          <section>{{ item.name }}</section>
          <section />
          <section />
        </div>
        <a-row>
          <a-col v-for="list in item.lists" :key="list.link" class="col" :xs="24" :sm="12" :md="8" :lg="6">
            <div
              class="card"
              :style="{
                borderTop: `3px solid ${list.color}`,
              }"
            >
              <a :href="list.link" class="title" target="_blank" rel="noopener noreferrer">
                {{ list.title }}
              </a>
              <div class="subtitle">
                {{ list.subtitle }}
              </div>
              <a
                :href="list.link"
                class="logo"
                target="_blank"
                rel="noopener noreferrer"
                :style="{
                  backgroundImage: `url(${list.logo})`,
                  backgroundColor: list.color,
                }"
              />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <Markdown />
  </div>
</template>

<script>
import Markdown from '@theme/components/Markdown'

export default {
  name: 'Links',
  components: { Markdown },
  data() {
    return {
      links: [],
    }
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      const { links } = this.$themeConfig
      if (links && links.length) {
        this.links = links
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/variable.less';

#links {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 24px 40px 24px;

  .content {
    margin-bottom: 40px;

    .wrapper {
      .hr {
        margin: 40px 0 0 0;
        padding: 0;
        height: 1px;
        background-color: #eff2f7;
      }

      .name {
        padding: 40px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        section {
          &:first-child {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            background-image: linear-gradient(to top, #3de0ad, #d0f2e9);
            animation: ball-1 2.3s ease-in-out infinite alternate;
          }

          &:nth-child(2) {
            padding: 0 10px;
            font-size: 26px;
            font-weight: 400;
            letter-spacing: 1.5px;
            color: rgba(0, 0, 0, 0.85);
            cursor: pointer;
            transition: 0.25s;

            &:hover {
              color: @primary-color;
            }
          }

          &:nth-child(3) {
            width: 24px;
            height: 24px;
            border-radius: 100%;
            background-image: linear-gradient(to left, #3ed4e9, #89edf6);
            animation: ball-2 2.7s ease-in-out infinite alternate;
          }

          &:last-child {
            margin-top: 10px;
            margin-left: -8px;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: rgba(91, 168, 238, 0.6);
            animation: ball-3 2.5s ease-in-out infinite alternate;
          }
        }
      }

      .col {
        .card {
          position: relative;
          margin: 15px 15px 30px 15px;
          padding: 20px 15px;
          height: 140px;
          border-radius: 13px 13px 3px 3px;
          box-shadow: 0 -3px 0 2px rgba(255, 255, 255, 0.75) inset, 0 -1px 0 #d8e0ea inset, -1px 0 0 #d8e0ea inset,
            1px 0 0 #d8e0ea inset, 0 5px 5px rgba(215, 221, 230, 0.5);
          background: linear-gradient(#eaeef5, #fafbfc 12%, #ffffff);
          text-align: center;
          cursor: pointer;

          .title {
            color: #475669;
            text-shadow: 0 1px #ffffff;
          }

          .subtitle {
            font-size: 13px;
            color: #8492a6;
            text-shadow: 0 1px #ffffff;
          }

          .logo {
            position: absolute;
            left: 50%;
            bottom: -20px;
            margin-left: -33px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 65px;
            height: 65px;
            color: #ffffff;
            text-shadow: 0 3px 5px rgba(0, 0, 0, 0.25);
            font-size: 25px;
            text-align: center;
            border-radius: 33px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            overflow: hidden;
            transition: left ease-out 0.3s, bottom cubic-bezier(0.5, 3, 0.5, 1) 0.75s, width ease-out 0.3s,
              height ease-out 0.3s, border-radius ease-out 0.15s, margin-left ease-out 0.3s;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.66;
              transition: 0.25s;
              background: linear-gradient(-150deg, rgba(255, 255, 255, 0.3) 10%, rgba(255, 255, 255, 0) 90%);
            }
          }
        }

        &:hover {
          .logo {
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            margin-left: 0;
            border-radius: 13px 13px 0 0;
            transition: ease-out 0.3s;
          }
        }
      }
    }
  }
}

@keyframes ball-1 {
  from {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -3px);
  }
  to {
    transform: translate(0, 6px);
  }
}

@keyframes ball-2 {
  from {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -1px);
  }
  to {
    transform: translate(0, 4px);
  }
}

@keyframes ball-3 {
  from {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -6px);
  }
  to {
    transform: translate(0, 3px);
  }
}
</style>
