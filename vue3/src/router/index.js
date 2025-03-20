import useSettingsStore from '@/store/modules/settings.js'
import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'

// 可选的进度条样式配置
import 'nprogress/nprogress.css'

// 自动加载路由模块
const routesContext = import.meta.glob('./modules/*.js', { eager: true })

// 处理路由模块
const moduleRoutes = Object.values(routesContext).map((module) => {
  if (!module.default) {
    console.error('路由模块缺少默认导出', module)
    return []
  }
  return module.default
})

// 扁平化路由并添加通配路由
const routes = [
  ...moduleRoutes.flat(),
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 配置进度条参数
NProgress.configure({
  showSpinner: false,
  parent: '#app',
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 示例鉴权逻辑（根据实际需求实现）
  // const userStore = useUserStore()
  // if (to.meta.requiresAuth && !userStore.isLoggedIn) {
  //   return next({ name: 'Login' })
  // }

  next()
})

router.afterEach((to) => {
  NProgress.done()
  useSettingsStore().setTitle(to.meta.title || '默认标题')
})

// 异常处理
router.onError((error) => {
  NProgress.done()
  console.error('路由错误:', error)
})

export default router
