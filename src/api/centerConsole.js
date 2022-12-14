import request from "@/utils/request";

export function fetchData(query) {
  return request({
    url: "/api/CenterConsole/pageList",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function fetchCnt(query) {
  return request({
    url: "/api/CenterConsole/fetchCnt",
    method: "get",
    params: query,
  });
}

export function reloadLines() {
  return request({
    url: "/api/CenterConsole/reloadLines",
    method: "get",
  });
}
