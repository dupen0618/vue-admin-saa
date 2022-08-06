import request from '@/utils/request'

export function equipment(obj) {
  return request({
    url: '/api/EquipmentH/pageList',
    method: 'get',
   params:obj
  })
}







