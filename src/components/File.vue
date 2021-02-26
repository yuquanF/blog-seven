<template>
  <div id="file">
    <div class="upload">
      <div class="box">
        <div class="title">
          <h1 title="文件上传">
            文件上传
          </h1>
        </div>
        <div class="container">
          <div class="container-item">
            <el-input v-model="task_id" type="text" placeholder="请输入任务编号" clearable>
              <template slot="prepend">
                任 务 号
              </template>
            </el-input>
          </div>
          <div class="container-item">
            <el-input v-model="code" type="text" placeholder="请输入上传码" clearable>
              <template slot="prepend">
                上 传 码
              </template>
            </el-input>
          </div>
          <div class="container-item">
            <el-input v-model="filename" type="text" placeholder="请输入文件名" clearable>
              <template slot="prepend">
                文 件 名
              </template>
            </el-input>
          </div>

          <div v-loading="loading" class="container-item">
            <el-upload
              ref="upload"
              class="upload-el"
              :disabled="disabled"
              :on-success="onSuccess"
              :on-error="onError"
              :op-progress="onProgress"
              :action="uploadUrl"
              :auto-upload="false"
              :limit="1"
            >
              <el-button slot="trigger" size="large" type="primary">
                选取文件
              </el-button>
              <el-button style="margin-left: 10px;" size="large" type="success" @click="submitUpload">
                上传文件
              </el-button>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '../../settings'

export default {
  name: 'File',
  data() {
    return {
      loading: false,
      task_id: '',
      code: '',
      filename: '',
      disabled: false,
    }
  },
  computed: {
    uploadUrl() {
      const filename = encodeURI(this.filename)
      return `${settings.baseURL}v1/file/cos?task_id=${this.task_id}&code=${this.code}&filename=${filename}`
    },
  },
  methods: {
    submitUpload() {
      this.loading = true
      this.$refs.upload.submit()
    },
    onSuccess() {
      this.loading = false
      this._clear()
      this.$message.success('上传成功')
    },
    onError(err) {
      this.loading = false
      const { message } = JSON.parse(err.message)
      let msg = ''
      if (typeof message === 'string') {
        msg = message
      } else {
        for (const val of Object.values(message)) {
          msg += ` ${val}`
        }
      }
      this.$message.error(`文件上传失败，${msg}`)
    },
    onProgress() {
      this.loading = true
      this.disabled = true
    },
    _clear() {
      this.disabled = false
      this.$refs.upload.clearFiles()
    },
  },
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 767px) {
  #file {
    padding-top: 500px;
  }
}

#file {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 24px 40px 24px;

  .upload {
    .box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      min-width: 320px;
      padding: 10px;
      border-radius: 5px;

      .title {
        height: 37px;
        font-size: 30px;
        line-height: 37px;
        margin-bottom: 15%;
        text-align: center;

        h1 {
          color: #abc1ea;
        }
      }

      .container {
        width: 100%;

        .container-item {
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          padding-bottom: 13px;
          margin-bottom: 34px;

          input {
            background: transparent;
            color: #2b2b2b;
            font-size: 14px;
            padding-left: 74px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
