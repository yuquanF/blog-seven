<template>
  <div id="dark">
    <a-button
      type="primary"
      shape="circle"
      icon="skin"
      size="large"
      @click="changeMode(mode === 'light' ? 'dark' : 'light')"
    />
  </div>
</template>

<script>
export default {
  name: 'Dark',
  data() {
    return {
      mode: 'light',
    }
  },
  mounted() {
    const mode = localStorage.getItem('mode') || 'light'
    if (mode === 'dark') {
      document.getElementsByTagName('body')[0].className = 'dark'
    } else {
      document.getElementsByTagName('body')[0].className = ''
    }
    this.mode = mode
    localStorage.setItem('mode', mode)
  },
  methods: {
    changeMode(mode) {
      if (mode === 'dark') {
        document.getElementsByTagName('body')[0].className = 'dark'
      } else {
        document.getElementsByTagName('body')[0].className = ''
      }
      this.mode = mode
      localStorage.setItem('mode', mode)
    },
  },
}
</script>

<style lang="less" scoped>
#dark {
  position: fixed;
  right: 20px;
  bottom: 200px;
  border-radius: 20px;
  box-shadow: 0 3px 12px darken(#98d1f2, 1%);
  background-color: #98d1f2;
  z-index: 10;

  & > .ant-btn {
    &:hover,
    &:focus {
      background-color: #98d1f2;
      border-color: #98d1f2;
    }
  }
}
</style>
