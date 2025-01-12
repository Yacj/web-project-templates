/**
 * @typedef {object} RouteMeta
 * @property {string} [title] - The page title
 */

/**
 * @typedef {object} RouteRecord
 * @property {string} path - Route path
 * @property {Function} component - Route component (lazy loaded)
 * @property {RouteMeta} [meta] - Route metadata
 */
/**
 * @type {RouteRecord[]}
 */
const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
]

export default routes
