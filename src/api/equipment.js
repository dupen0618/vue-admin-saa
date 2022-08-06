import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/equipment/pageList',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}