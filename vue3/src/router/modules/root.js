/**
 * Vue Router configuration
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
    },
  },
]

export default routes
