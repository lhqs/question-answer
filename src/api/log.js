import request from '@/utils/request'

export function setLog(clickPage, operateContent) {
  return request({
    url: '/log/setList',
    method: 'post',
    data: {
      clickPage, operateContent
    }
  })
}

export function getLog(pageNum, pageSize) {
  return request({
    url: '/log/getList',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
// export function setLog(params) {
//   return request({
//     url: '/log/setList',
//     method: 'post',
//     data: {
//       params
//     }
//   })
// }
