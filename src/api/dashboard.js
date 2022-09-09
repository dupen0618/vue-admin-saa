import request from "@/utils/request";

export function fetchData(query) {
  return request({
    url: "/api/Dashboard/FetchData",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function fetchLeftStatusData(query) {
  return request({
    url: "/api/Dashboard/fetchLeftStatusData",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function reloadProductionConfig(query) {
  return request({
    url: "/api/Dashboard/ReloadProductionConfig",
    method: "get",
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query,
  });
}

export function UpdateOrCreate(query) {
  return request({
    url: "/api/Dashboard/UpdateOrCreate",
    method: "get",
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: query,
  });
}

export function fetchDataAlarmList(query) {
  return request({
    url: "/api/Dashboard/fetchDataAlarmList",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function fetchAlarmFrequencyData(query) {
  return request({
    url: "/api/Dashboard/fetchAlarmFrequencyData",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function fetchMaintenanceDateAndRuningStausData(query) {
  return request({
    url: "/api/Dashboard/fetchMaintenanceDateAndRuningStausData",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}
