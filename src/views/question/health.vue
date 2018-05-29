<template>
  <div class="symptom">
    <h3 class="title">常见健康问答</h3>
    <div class="searchRound">
      <div>
        <el-col :span="22"><el-input v-model=" inputValue " placeholder="请输入症状"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input></el-col>
        <el-col :span="2"><el-button type="primary" v-on:click="searchAnswer">查询</el-button></el-col>
      </div>
    </div>

    <div class="buttonInfo">
      <el-row :gutter="20">
        <el-col :span="8"><div><el-button type="info" plain @click="handleClick">老年人得了高血压需要做什么检查</el-button></div></el-col>
        <el-col :span="6"><div><el-button type="info" plain @click="handleClick">老年人高血压如何治疗</el-button></div></el-col>
        <el-col :span="6"><div><el-button type="info" plain @click="handleClick">老年人如何预防高血压</el-button></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div><el-button type="info" plain @click="handleClick">糖尿病如何治疗</el-button></div></el-col>
        <el-col :span="5"><div><el-button type="info" plain @click="handleClick">如何预防糖尿病</el-button></div></el-col>
        <el-col :span="6"><div><el-button type="info" plain @click="handleClick">糖尿病有哪些并发症</el-button></div></el-col>
        <el-col :span="5"><div><el-button type="info" plain @click="handleClick">糖尿病的临床表现</el-button></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div><el-button type="info" plain @click="handleClick">胃溃疡如何治疗</el-button></div></el-col>
        <el-col :span="6"><div><el-button type="info" plain @click="handleClick">为什么会得胃溃疡</el-button></div></el-col>
        <el-col :span="5"><div><el-button type="info" plain @click="handleClick">胃溃疡如何预防</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">什么是胃溃疡</el-button></div></el-col>
      </el-row>
    </div>

    <div class="searchResult" v-show='isVisual'>
      <h3 class="resultTitle">您可能还想问</h3>

      <div class="resultContent">

        <div v-if="recommend_question.length ">
          <table width="100%" rowspan="2" border="1" cellspacing="0.3" cellpadding="4" bgcolor="#FFFFFF" align="center">
            <tr>
              <td height="50px" v-for="index in recommend_question">
                {{ index }}
              </td>
            </tr>
          </table>
        </div>
        <div class="noResult" v-else >系统未能匹配你所查询的结果 </div>
        <div class="resultPossible">查询结果</div>

      </div>
      <div class="probableResult">
        <span v-html="answer"></span>
      </div>

    </div>
  </div>


</template>

<script>
  import { getAnswer } from '../../api/api'

  export default {
    name: 'symptom',
    data() {
      return {
        inputValue: '',
        isVisual: false,
        answer: [],
        recommend_question: []
      }
    },
    methods: {
      handleClick(evt) {
        this.inputValue = evt.path[0].innerText
      },
      searchAnswer() {
        this.isVisual = true
        const param = { q: this.inputValue }
        getAnswer(param).then(res => {
          // console.log('d-res -->' + res.data.diseases)
          this.answer = res.data.answer
          this.recommend_question = res.data.recommend_question
        }).then(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .symptom {
    width: 1000px;
    margin: auto;
    background-color: #ffffff;
  }
  .title {
    text-align: center;
  }

  .searchRound {
    width: 700px;
    margin: auto;
    /*margin-top: 10px;*/
  }
  .buttonInfo {
    margin: auto;
    margin-top: 60px;
    margin-bottom: 40px;
    /*margin-left: 10px;*/
    width: 750px;

  }
  .searchResult {
    /*margin: auto;*/
    border: #a9b8ce solid 1px;
  }
  .el-button--info{
    margin-top: 10px;
    margin-left: 30px;
  }
  .resultTitle {
    background-color: #dcdcdc;
    text-align: center;
    font-size: large;
    padding: 20px;
    margin: 0px;
  }
  .recommandIndex{
    font-size: 20px;
    font-weight:bold;
  }
  .resultContent {
    text-align: center;
  }

  .resultPossible {
    background-color: #dcdcdc;
    text-align: center;
    padding: 10px;
  }
  .noResult{
    margin: 14px;
    color: red;
  }
  .probableResult {
    margin: 15px;
  }


</style>
