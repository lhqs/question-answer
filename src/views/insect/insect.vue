<template>
    <div class="insect-title">
      <div class="upload-top">昆虫识别PC端</div>
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
      <div align="center" v-show="uploadUrl"><img :src="uploadUrl" width="400px" height="200px" style="margin: auto"/></div>
      <div class="upload-par" v-show="uploadUrl">
        <el-button size="small" type="success" @click="submitUpload">开始识别</el-button>
      </div>
      <div class="is-tip" v-show="isTip">提示：你可能需要等待20-50秒,请稍后</div>
      <div class="anslysis-title" v-show="isShow">识别结果</div>
      <div class="result-show" v-show="isShow">
        <div class="show" v-for="(index,item) in resList">
          <div class="desc"><span class="row-line">描述：{{index.descpation}}</span><span class="row-line">相似度：{{index.rate}}</span> </div>
          <span class="pic-show" align="center"><img :src=index.res[0] width="300px" height="180px" style="margin: auto"/></span>
          <span class="pic-show" align="center"><img :src=index.res[1] width="300px" height="180px" style="margin: auto"/></span>
          <span class="pic-show" align="center"><img :src=index.res[2] width="300px" height="180px" style="margin: auto"/></span>
        </div>
      </div>
    </div>
</template>

<script>
  import { uploadLogeUrl } from '../../api/otherApi'
  export default {
    name: 'insect',
    data() {
      return {
        title: '',
        uploadUrl: '',
        fileList: [],
        fileRes: '',
        resList: [],
        isShow: false,
        isTip: false
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit()
        this.isTip = true
      },
      handleChange(file) {
        this.uploadUrl = file.url
      },
      handlePreview(file) {
        this.fileList = file
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      beforeUpload: function(file) {
        const fileData = new FormData()
        fileData.append('file', file)
        uploadLogeUrl(fileData).then(res => {
          this.fileRes = res.data.data
          this.resList = res.data.data
          this.isTip = false
          this.isShow = true
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
    margin: 30px auto 15px auto;
  }
  .anslysis-title {
    color:white;
    text-align: center;
    margin: auto;
    background-color: #5b5b5b;
    width: 60%;
    padding: 12px;
  }
  .result-show {
    text-align: center;
    margin: 20px auto 20px auto;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 60%;
    background-color: #d6d6d6;
  }
  .row-line {
    /*margin-right: 25px;*/
    margin: 20px 15px 10px 15px;
  }
  .pic-show{
    padding: 10px;
  }
  .show {
    margin: 20px 15px 10px 15px;
  }
  .desc {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .is-tip {
    text-align: center;
  }

</style>
