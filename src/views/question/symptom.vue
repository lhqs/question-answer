<template>
  <div class="symptom">
    <h3 class="title">按症状查科室</h3>
    <div class="searchRound">
      <div>
        <el-col :span="22"><el-input v-model=" inputValue " placeholder="请输入症状"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input></el-col>
        <el-col :span="2"><el-button type="primary" v-on:click="searchDepartment">查询</el-button></el-col>
      </div>
    </div>

    <div id="buttonInfo">
      <el-row :gutter="20">
        <el-col :span="3"><div><el-button type="info" plain @click="handleClick">头晕</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">关节疼痛</el-button></div></el-col>
        <el-col :span="3"><div><el-button type="info" plain @click="handleClick">恶心</el-button></div></el-col>
        <el-col :span="3"><div><el-button type="info" plain @click="handleClick">呕吐</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">出汗异常</el-button></div></el-col>
        <el-col :span="3"><div><el-button type="info" plain @click="handleClick">口臭</el-button></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">心率失常</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">心率失常</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">颈背疼痛</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">多尿尿频</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">烦躁不安</el-button></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">烦渴多饮</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">面色苍白</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">四肢无力</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">频繁发笑</el-button></div></el-col>
        <el-col :span="4"><div><el-button type="info" plain @click="handleClick">排便障碍</el-button></div></el-col>
      </el-row>
    </div>

    <div class="searchResult" v-show='isVisual'>
      <h3 class="resultTitle">查询结果</h3>

      <div class="resultContent">
        <!--<div  class="recommandIndex">推荐科室:
          <span>
            <div style="display: inline" v-for="(sequence, index) in departments">
            {{ index + 1 }}:{{sequence}}
            </div>
          </span>
        </div>-->

        <div v-if="departments.length ">
        <table width="50%" rowspan="2" border="0.1" cellspacing="1" cellpadding="4" bgcolor="#FFFFFF" align="center">
          <tr>
            <td height="50px" v-for="index in departments">
            {{ index }}
            </td>
          </tr>
        </table>
        </div>
        <div class="noResult" v-else >系统未能匹配你所查询的结果 </div>
        <div class="resultPossible">以下疾病很可能包含上述病症</div>
        <div class="probableResult">
          <el-table
            :data="diseases"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="disease_CNname"
              label="疾病名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="department_name"
              label="科室"
              sortable
              width="160">
            </el-table-column>
            <el-table-column
              prop="summary"
              label="概述">
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
  import { getDepartment } from '../../api/api'

  export default {
    name: 'symptom',
    data() {
      return {
        inputValue: '',
        isVisual: false,
        loginForm: 'symptom',
        departments: [],
        diseases: []
      }
    },
    methods: {
      handleClick(evt) {
        if (this.inputValue === '') {
          this.inputValue = evt.path[0].innerText
        } else {
          this.inputValue = this.inputValue + ',' + evt.path[0].innerText
        }
      },
      searchDepartment() {
        this.isVisual = true
        const param = { q: this.inputValue }
        getDepartment(param).then(res => {
          // console.log('d-res -->' + res.data.diseases)
          this.departments = res.data.departments
          this.diseases = res.data.diseases
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
  #buttonInfo {
    margin: auto;
    margin-top: 60px;
    margin-bottom: 40px;
    /*margin-left: 10px;*/
    width: 650px;

  }
  .searchResult {
    margin: auto;
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


</style>
