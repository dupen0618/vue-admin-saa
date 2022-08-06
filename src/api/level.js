import VueResource from 'vue-resource'

export function updateLevelList(list){
  return this.$http.post('/api/MaintenanceLevel/updateList/',list,{emulateJSON:true});
}