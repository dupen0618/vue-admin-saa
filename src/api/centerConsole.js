import request from '@/utils/request'

export function fetchData(query) {
  return request({
    url: '/api/CenterConsole/pageList',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}