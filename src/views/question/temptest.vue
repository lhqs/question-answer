<template>
  <div class="top"><h3>临时测试页面</h3>
    <button @click="tempTest">click me for temptest</button>
    <hr>
    <button @click="getIP">click me for getIP </button>
    <div class="ip">{{ip}}</div>
    <hr>
    <button @click="getIPAddr">click me for getIPAddr </button>
    <hr>
  </div>
</template>

<script>
  import { getTemptest } from '../../api/api'
  import axios from 'axios'

  export default {
    name: 'temptest',
    data() {
      return {
        ip: ''
      }
    },
    methods: {
      tempTest() {
        const params = { query: '十三届全国人大一次会议在北京人民大会堂举行第五次全体会议。', token: 'YuzYNvYMna-q6-NTHssPTQDCpzEKZJdV' }
        getTemptest(params).then(res => {
          console.log('res --> ' + res)
        }).catch(err => {
          console.log('err --> ' + err)
        })
      },
      getIP() {
        axios.get('http://localhost:8099/api/getIp').then(function(response) {
          console.log(response)
        }).catch(function(response) {
          console.log(response)
        })
      },
      getIPAddr() {
        // const ip = { ip: '61.153.48.135' }
        axios.get('http://ip.taobao.com/service/getIpInfo.php', {
          params: { ip: '61.153.48.135' }
        }).then(function(response) {
          console.log(response)
        }).catch(function(response) {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
.top {
  margin:30px;
}
</style>
