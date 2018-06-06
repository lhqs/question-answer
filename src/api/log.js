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

export function getLoglistTime(pageNum, pageSize, startTime, endTime) {
  return request({
    url: '/log/getLogList',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      startTime,
      endTime
    }
  })
}

export function deleteLogById(logId) {
  return request({
    url: '/log/deleteLogById',
    method: 'delete',
    params: {
      logId
    }
  })
}

export const downloadUrl = url => {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = () => {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

export function exportExcelForLog(startTime, endTime) {
  return request({
    url: '/log/exportLogByTime',
    method: 'get',
    params: {
      startTime,
      endTime
    }
  })
}
export function exportCsvForLog(startTime, endTime) {
  return request({
    url: '/log/exportLogForCsv',
    method: 'get',
    params: {
      startTime,
      endTime
    }
  })
}
