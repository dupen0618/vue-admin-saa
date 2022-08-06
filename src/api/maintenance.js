import request from '@/utils/request'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/api/maintenance/pageList',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query
  })
}

export function createMaintenance(maintenance) {
  return request({
    url: '/api/maintenance/Create',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: maintenance
  })
}


export function maintenanceLevelList() {
  return request({
    url: '/api/maintenanceLevel/getList',
    method: 'post'
  })
}

export function updateMaintenanceLevelList(list) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/api/MaintenanceLevel/updateList',
    method: 'POST',
    data: {
      firstName: "张三"
    }
  })
}
