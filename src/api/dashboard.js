import request from '@/utils/request'

export function fetchData(query) {
  return request({
    url: '/api/Dashboard/FetchData',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}

export function fetchLeftStatusData(query){
  return request({
    url: '/api/Dashboard/fetchLeftStatusData',
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}

export function ReloadProductionConfig(query){
  return request({
    url: '/api/Dashboard/ReloadProductionConfig',
    method: 'get',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}

export function UpdateOrCreate(query){
  return request({
    url: '/api/Dashboard/UpdateOrCreate',
    method: 'get',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}