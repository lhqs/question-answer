import axios from 'axios'

// let baseUrl = 'http://plant.lhqs1314.cn:8011/api';
// const baseUrl = 'http://api.deepintell.net/ners'

export const getTextAnalysisRes = params => {
  return axios.post('ners/ner', params)
}

// export const getTextAnalysisRes = params => {
//   return axios.post(`${baseUrl}/ner`, params)
// }
