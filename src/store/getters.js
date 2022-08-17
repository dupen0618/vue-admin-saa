const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state=> state.user.role,
  addRouters: state => state.routerMap.addRouters,
  routers : state => state.routerMap.routers
}
export default getters
