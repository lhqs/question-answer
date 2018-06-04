import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // newAdd at 2018-05-27 17:43
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '问答系统', icon: 'arrow-left' }
      }
    ]
  },

  {
    path: '/symptom',
    component: Layout,
    children: [
      {
        path: 'symptom',
        name: 'Symptom',
        component: () => import('@/views/question/symptom'),
        meta: { title: '症状科室', icon: 'consult' }
      }
    ]
  },

  {
    path: '/health',
    component: Layout,
    children: [
      {
        path: 'health',
        name: 'Health',
        component: () => import('@/views/question/health'),
        meta: { title: '健康咨询', icon: 'example' }
      }
    ]
  },

  {
    path: '/textAnalysis',
    component: Layout,
    children: [
      {
        path: 'textAnalysis',
        name: 'TextAnalysis',
        component: () => import('@/views/deepintell/ner'),
        meta: { title: '文本分析', icon: 'analyse' }
      }
    ]
  },

  {
    path: '/logger',
    component: Layout,
    children: [
      {
        path: 'logger',
        name: 'Logger',
        component: () => import('@/views/question/logger'),
        meta: { title: '操作日志', icon: 'browse' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'tree' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'form',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'chart' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'example' }
  //     }
  //   ]
  // },

  // {
  //   path: '/temptest',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'temptest',
  //       name: 'Temptest',
  //       component: () => import('@/views/question/temptest'),
  //       meta: { title: '临时测试', icon: 'form' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

