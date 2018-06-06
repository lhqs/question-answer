import axios from 'axios'

// let baseUrl = 'http://plant.lhqs1314.cn:8011/api';
// const baseUrl = 'http://api.deepintell.net/ners'

export const getTextAnalysisRes = params => {
  return axios.post('ners/ner', params)
}

// export const getTextAnalysisRes = params => {
//   return axios.post(`${baseUrl}/ner`, params)
// }

export const getAddrByIp = params => {
  return axios.get('services/service/getIpInfo.php', { params: params })
}
// axios.get('', {
//   // params: { ip: '61.153.48.135' }
//   params: { ip: '125.70.11.136' }
// }).then(function(response) {
//   console.log(response.data.data)
//   const res = response.data.data
//   _this.ipAddr = res.country + '-' + res.city + '-' + res.region + '-' + res.isp
// }).catch(function(response) {
//   console.log(response)
// })

export const uploadLogeUrl = params => { return axios.post('insects/insect-2.1/api/insect/uploadImage', params) }
