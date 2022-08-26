import request from '@/utils/request'

export function fetchData(query) {
  return request({
    url: '/api/HistoricalData/pageList',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}