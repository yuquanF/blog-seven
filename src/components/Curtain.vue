<template>
  <div id="curtain">
    <a-spin class="spin" :tip="tip" size="large" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: 'Loading...',
      textShadow: '#e91e63',
    }
  },
  created() {
    this.initConfig()
  },
  methods: {
    initConfig() {
      const { curtain } = this.$themeConfig
      if (curtain) {
        const { tip, textShadow } = curtain
        if (tip) {
          this.tip = tip
        }
        if (textShadow) {
          this.textShadow = textShadow
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
#curtain {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 99990;
  top: 30%;

  .spin {
    color: #687293;
  }
}
</style>
