// store/routerMap.js
import { asyncRouterMap, constantRouterMap, resetRouter } from "@/router";

function hasPermission(role, route) {
  if (route.meta && route.meta.role) {
    // return roles.some(role => route.meta.role.indexOf(role) >= 0)
    return route.meta.role.indexOf(role) >= 0;
  } else {
    return true;
  }
}

const routerMap = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter((v) => {
          if (roles == 0) return true;
          if (roles == 3) {
            if (v.name == "Dashboard") {
              v.path = "/";
              v.children[0].path = "dashboard";
            }
            if (v.name == "CenterConsole") {
              v.path = "/centerConsole";
            }
            if (v.name == "Equipment") {
              v.path = "/equipment";
            }
          }
          if (roles == 2) {
            if (v.name == "Dashboard") {
              v.path = "/dashboard";
              v.children[0].path = "dashboard/:equipmentIp";
            }
            if (v.name == "CenterConsole") {
              v.path = "/";
            }
            if (v.name == "Equipment") {
              v.path = "/equipment";
            }
          }
          if (roles == 1) {
            if (v.name == "Dashboard") {
              v.path = "/dashboard";
              v.children[0].path = "dashboard/:equipmentIp";
            }
            if (v.name == "CenterConsole") {
              v.path = "/centerConsole";
            }
            if (v.name == "Equipment") {
              v.path = "/";
            }
          }
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter((child) => {
                if (hasPermission(roles, child)) {
                  return child;
                }
                return false;
              });
              return v;
            } else {
              return v;
            }
          }
          return false;
        });
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    },
    resetRouter({ commit }, data) {
      const { roles } = data;
      const accessedRouters = asyncRouterMap.filter((v) => {
        if (roles == 0) {
          // v.path = "/centerConsole";
          return true;
        }
        if (roles == 3 && v.path == "/") {
          v.path = "/dashboard";
          v.children[0].path = "dashboard";
        }
        // if (roles == 2 && v.path == "/") {
        //   v.path = "/centerConsole";
        //   v.children[0].path = "centerConsole";
        // }
        if (roles == 1 && v.path == "/") {
          v.path = "/equipment";
        }
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter((child) => {
              if (hasPermission(roles, child)) {
                return child;
              }
              return false;
            });
            return v;
          } else {
            return v;
          }
        }
        return false;
      });
      commit("SET_ROUTERS", accessedRouters);
      resolve();
    },
  },
};

export default routerMap;
