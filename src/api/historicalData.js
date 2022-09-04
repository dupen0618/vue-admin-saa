import request from "@/utils/request";

export function fetchData(query) {
  return request({
    url: "/api/HistoricalData/pageList",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function reloadLines() {
  return request({
    url: "/api/HistoricalData/reloadLines",
    method: "get",
  });
}

export function reloadAlarmList() {
  return request({
    url: "/api/HistoricalData/reloadAlarmList",
    method: "get",
  });
}

export function timeStatisticsPageList(query) {
  return request({
    url: "/api/HistoricalData/timeStatisticsPageList",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function timeStatisticsList(query) {
  return request({
    url: "/api/HistoricalData/timeStatisticsList",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}
