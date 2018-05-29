import axios from 'axios'

// let baseUrl = 'http://localhost:8011/api';
// let baseUrl = 'http://plant.lhqs1314.cn:8011/api';
const baseUrl = 'http://60.247.77.152:19003/api'

// export const uploadLogeUrl = params => { return axios.post(`${baseUrl}/uploadOrgLogo`,  params)}
export const uploadLogeUrl = params => {
  return axios.post(`${baseUrl}/uploadOrgLogo`, params)
}

// 按症状查科室
export const getDepartment = params => {
  return axios.get(`${baseUrl}/getDepartment`, { params: params })
}

// 常见健康问答
export const getAnswer = params => {
  return axios.get(`${baseUrl}/getAnswer`, { params: params })
}

// temp_test
export const getTemptest = params => {
  return axios.get(`http://api.deepintell.net/ner`, { params: params })
}

// login
export const logintest = params => {
  return axios.post(`http://localhost:8099/api/login`, params)
}
// info
export const getInfoTest = params => {
  return axios.post(`http://localhost:8099/api/getInfo`, params)
}
