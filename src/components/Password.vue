<template>
  <div id="password">
    <div class="wrapper">
      <a-input-password v-model="pwd" allow-clear :placeholder="$l('password')" @pressEnter="checkPwd">
        <a-icon slot="prefix" type="lock" />
      </a-input-password>
      <a-button class="submit" type="primary" @click="checkPwd">
        {{ $l('enter') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

export default {
  name: 'Password',
  data() {
    return {
      pwd: '',
    }
  },
  mounted() {
    this.$notification.info({
      message: this.$l('pwdInfoMsg'),
      description: this.$l('pwdInfoDesc'),
      duration: 2.3,
    })
  },
  methods: {
    checkPwd() {
      if (this.pwd) {
        const pwd = Base64.stringify(SHA256(this.pwd))
        if (this.$page.password === pwd) {
          this.$notification.success({
            message: this.$l('pwdOkMsg'),
            description: this.$page.title,
            duration: 1.3,
          })
          this.$page.password = false
          this.$router.push('/back.html')
        } else {
          this.$notification.error({
            message: this.$l('pwdErrMsg'),
            description: this.$l('pwdErrDesc'),
            duration: 2.3,
          })
        }
      } else {
        this.$notification.warning({
          message: this.$l('pwdWarnMsg'),
          description: this.$l('pwdWarnDesc'),
          duration: 2.3,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
#password {
  margin: auto;
  padding: 0 24px;
  width: 100%;
  max-width: 1200px;
  min-height: calc(~'100vh - 84px');
  display: flex;
  flex-direction: column;
  justify-content: center;

  .wrapper {
    margin: 0 auto;
    width: 50%;
    text-align: center;

    .submit {
      margin-top: 20px;
    }
  }
}

@media only screen and (max-width: 767px) {
  #password {
    .wrapper {
      width: 80%;
    }
  }
}

@media screen and (max-width: 480px) {
  #password {
    .wrapper {
      width: 100%;
    }
  }
}
</style>
