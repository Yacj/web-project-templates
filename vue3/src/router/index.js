import useSettingsStore from '@/store/modules/settings.js'

import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'nprogress/nprogress.css'

let routes = []
const routesContext = import.meta.glob('./modules/*.js', { eager: true })
Object.keys(routesContext).forEach((v) => {
  routes.push(routesContext[v].default)
})
routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/[...all].vue'),
  meta: {
    title: '找不到页面',
  },
})
routes = routes.flat()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  NProgress.start()
  next()
  // if (to.meta.requireLogin) {
  //   if (userStore.isLogin) {
  //     next()
  //   }
  //   else {
  //     next({
  //       name: 'login',
  //       query: {
  //         redirect: to.fullPath,
  //       },
  //     })
  //   }
  // }
  // else {
  //   next()
  // }
})

router.afterEach((to) => {
  NProgress.done()
  useSettingsStore().setTitle(to.meta.title ?? '')
})
export default router
