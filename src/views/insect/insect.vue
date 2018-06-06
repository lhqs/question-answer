<template>
    <div class="insect-title">
      <div class="upload-top">昆虫识别</div>
        <div class="upload-par">
          <el-upload
            class="upload-insect"
            ref="upload"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false"
            :multiple="false">
            <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
          </el-upload>
        </div>
        <div class="upload-par">
          <el-button size="small" type="success" @click="submitUpload">开始识别</el-button>
        </div>
      <div class="anslysis-title">识别结果</div>
      <div class="result-show">
        <el-row>
          <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="http://qiniu.lhqs1314.cn/img/user/f8d14c460d4440.jpeg" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="result">
        {{fileList}}
      </div>
      <hr>
        <div class="result">
          {{fileRes}}
        </div>
    </div>
</template>

<script>
  // import { uploadLogeUrl } from '../../api/api'
  import { uploadLogeUrl } from '../../api/otherApi'

  export default {
    name: 'insect',
    data() {
      return {
        title: '',
        fileList: [],
        fileRes: ''
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit()
      },
      handleChange() {
        console.log('handleChange')
      },
      handlePreview(file) {
        console.log(file)
        this.fileList = file
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      beforeUpload: function(file) {
        const fileData = new FormData()
        fileData.append('file', file)
        uploadLogeUrl(fileData).then(res => {
          console.log('reso-->', res)
          this.fileRes = res.data.data
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.upload-top {
  text-align: center;
  margin: 15px auto 15px auto;
}
  .upload-par{
    text-align: center;
    margin: 15px auto 15px auto;
  }
  .anslysis-title {
    text-align: center;
    margin: auto;
    background-color: #99a9bf;
    width: 40%;
    padding: 12px;
  }
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
