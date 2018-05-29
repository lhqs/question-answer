<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
    <div class="mainTitle">医疗健康问答系统首页</div>
    <div class="doing">进行时</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    // 判断是否登录，未登录无法访问
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.mainTitle {
  margin:auto;
  text-align: center;
  font-size: 40px;
}
  .doing {
    text-align: center;
    margin-top: 20px;
  }
</style>
