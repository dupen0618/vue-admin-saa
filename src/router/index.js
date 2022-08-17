import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
]

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/centerConsole',
    meta: { role: [2] }, //页面需要的权限
    children: [{
      path: 'centerConsole',
      name: 'CenterConsole',
      component: () => import('@/views/centerConsole/index'),
      meta: { title: '中控台', icon: 'el-icon-s-operation', role: [2] }
    }]
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: { role: [2,3] }, //页面需要的权限
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '本地看板', icon: 'dashboard', role: [2,3]}
    }]
  },
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'component', role: [1] },
    children: [
      {
        path: 'equipment',
        name: 'Equipment',
        component: () => import('@/views/equipment/index'),
        meta: { title: '设备管理', icon: 'component', role: [1] }
      },
      {
        path: 'maintenance',
        name: 'Maintenance',
        component: () => import('@/views/equipment/maintenance'),
        meta: { title: '设备保养记录', icon: 'maintenance', role: [1] }
      },
      {
        path: 'defaultDate',
        name: 'DefaultDate',
        component: () => import('@/views/equipment/defaultDate'),
        meta: { title: '设备日期默认值维护', icon: 'maintenance', role: [1] }
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    redirect: '/group/user',
    name: 'Group',
    meta: { title: '用户管理', icon: 'peoples', role: [1] },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user', role: [1] }
      },
      // {
      //   path: 'role',
      //   name: 'Role',
      //   component: () => import('@/views/role/index'),
      //   meta: { title: '权限管理', icon: 'el-icon-key' }
      // }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
