import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list1',
    method: 'get',
    params
  })
}
