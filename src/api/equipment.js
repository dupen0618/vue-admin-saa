import request from "@/utils/request";

export function fetchList(query) {
  return request({
    url: "/api/equipment/pageList",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function getEquipment(query) {
  return request({
    url: "/api/equipment/getEquipment",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function getEquipmentConfig(query) {
  return request({
    url: "/api/equipment/getEquipmentConfig",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function createOrUpdateEquipmentConfig(query) {
  return request({
    url: "/api/equipment/createOrUpdateEquipmentConfig",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function findEquipmentConfig(query) {
  return request({
    url: "/api/equipment/findEquipmentConfig",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}

export function deleteEquipmentConfig(query) {
  return request({
    url: "/api/equipment/deleteEquipmentConfig",
    method: "get",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: query,
  });
}
