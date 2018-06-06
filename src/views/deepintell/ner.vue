<template>
  <div class="topTitle">
    <div class="inputTitle">请输入要分析的文本</div>
    <div class="inputContent">
        <el-input type="textarea" v-model="query" :placeholder="placeholder" rows="4"></el-input>
      <!--<p id="textBorder" contenteditable="true" v-model="inputDesc"></p>-->
    </div>
    <div class="submitButton">
      <el-button type="primary" @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">分析</el-button>
    </div>
    <div class="resultclass">
      <div v-html="result"></div>
    </div>

    <div class="tiptop" v-show="result">
      <span class="org">组织名</span>
      <span class="loc">地名</span>
      <span class="per">人名</span>
    </div>
  </div>
</template>

<script>
  import { getTextAnalysisRes } from '../../api/otherApi'
  import { setLog } from '../../api/log'
  // import axios from 'axios'

  export default {
    name: 'ner',
    data() {
      return {
        query: '',
        placeholder: '十三届全国人大一次会议在北京人民大会堂举行第五次全体会议。习近平当选中华人民共和国主席、中华人民共和国中央军事委员会主席。',
        result: '',
        /* resresult: '十三届<span v-bind:style="styleObject">全国人大</span>一次会议在<span class="loc">北京人民大会堂</span>\n' +
        '      举行第五次全体会议。<span class="per">习近平</span>当选<span class="loc">中华人民共和国</span>\n' +
        '      主席、<span class="org">中华人民共和国中央军事委员会</span>主席。',*/
        loading: false,
        token: '0PGhnuiwd6CTfRmy3G8iYpgsMAt-Fc2i'
      }
    },
    methods: {
      /* onSubmit() {
        const params = {
          query: this.inputDesc,
          token: '0PGhnuiwd6CTfRmy3G8iYpgsMAt-Fc2i'
        }
        console.log('text_input:' + this.inputDesc)
        getTextAnalysisRes(params).then(res => {
          console.log('text_res:' + res)
          console.log(res.data['0'].positionStamp[0])
          this.returnContent = res.data
          // this.htmlContent = this.inputDesc.substring()''
          /!* setLog('语义分析', this.inputDesc).then().catch(err => {
            console.log('setlog err -->' + err)
          })*!/
        }).catch(err => {
          console.log('text_err:' + err)
        })
      },*/
      onSubmit() {
        const _this = this
        const query = this.query || this.placeholder
        // this.loading = true
        getTextAnalysisRes({ query: query, token: this.token }).then(res => {
          // _this.loading = false
          const entities = []
          for (const key in res.data) {
            entities.push(res.data[key])
          }
          _this.result = query
          const arr = query.split('')
          const resultArr = []
          arr.forEach((s, i) => {
            resultArr.push(s)
            entities.forEach(entity => {
              const start = entity.positionStamp[0]
              const end = entity.positionStamp[1]
              if (i === start) {
                resultArr.pop()
                resultArr.push('<span style="' + _this.getStyle(entity.type.toLowerCase()) + '">' + arr.slice(start, end).join('') + '</span>')
                // resultArr.push('<span class="' + entity.type.toLowerCase() + '">' + arr.slice(start, end).join('') + '</span>')
              }
              if (i > start && i < end) resultArr.pop()
            })
          })
          _this.result = resultArr.join('')
          setLog('文本分析', _this.query || _this.placeholder).then().catch(err => {
            console.log('text-analysis setlog err -->' + err)
          })
        })
      },
      getStyle(style) {
        if (style === 'org') {
          return 'background-color: #dd7a7b;  color: white;margin: 9px; padding: 1px;line-height: 30px;'
        } else if (style === 'loc') {
          return 'background-color: #16c092;  color: white;margin: 9px; padding: 1px;line-height: 30px;'
        } else {
          return 'background-color: #8e8f91;  color: white;margin: 9px; padding: 1px;line-height: 30px;'
        }
      },
      onReset() {
        this.query = ''
      }
    },
    computed: {
      // btnClick: function() {
      //   return ['btn', 'btn-primary', { loading: this.loading }]
      // }
    }
  }
</script>

<style scoped>
  .topTitle {
    margin:auto;
    width:50%;
  }

  .inputTitle {
    text-align: center;
    margin:15px 0px 15px 0px;
  }

  .submitButton{
    float: right;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .resultclass {
    text-align: center;
    margin-top: 42px;
    font-size: 18px;
    clear: both;
  }
  .tiptop {
    text-align: center;
    margin: 25px;
  }

  .org {
    background-color: #dd7a7b;
    color: white;
    margin-right: 15px;
    padding: 4px;
  }
  .loc {
    background-color: #16c092;
    color: white;
    margin-right: 15px;
    padding: 4px;

  }
  .per {
    background-color: #8e8f91;
    color: white;
    padding: 4px;

  }
</style>
