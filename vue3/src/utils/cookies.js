/**
 * 通用前缀，用于所有 cookie 键
 * @type {string}
 */
const COOKIE_PREFIX = import.meta.env.VITE_APP_PREFIX || 'app_'

const Cookies = {
  /**
   * 设置一个 cookie
   * @param {string} key - 键名，不需要包含前缀
   * @param {string} value - 键值
   * @param {object} [options] - 额外配置
   * @param {number} [options.expires] - 过期时间（天数）
   * @param {string} [options.path] - Cookie 的路径
   * @example
   * Cookies.set('token', 'abc123', { expires: 7, path: '/' });
   */
  set(key, value, options = {}) {
    const { expires, path = '/' } = options
    let cookieString = `${COOKIE_PREFIX}${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=${path}`

    if (expires) {
      const date = new Date()
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
      cookieString += `; expires=${date.toUTCString()}`
    }

    document.cookie = cookieString
  },
  /**
   * 获取一个 cookie 的值
   * @param {string} key - 键名，不需要包含前缀
   * @returns {string|null} 如果存在返回值，否则返回 null
   * @example
   * const token = Cookies.get('token');
   */
  get(key) {
    const prefixedKey = `${COOKIE_PREFIX}${encodeURIComponent(key)}=`
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
      if (cookie.startsWith(prefixedKey)) {
        return decodeURIComponent(cookie.substring(prefixedKey.length))
      }
    }
    return null
  },
  /**
   * 删除一个 cookie
   * @param {string} key - 键名，不需要包含前缀
   * @param {object} [options] - 额外配置
   * @param {string} [options.path] - Cookie 的路径
   * @example
   * Cookies.delete('token', { path: '/' });
   */
  delete(key, options = {}) {
    const { path = '/' } = options
    document.cookie = `${COOKIE_PREFIX}${encodeURIComponent(key)}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  },
  /**
   * 获取所有 cookies
   * @returns {object} 包含所有以指定前缀开头的 cookies 的键值对
   * @example
   * const allCookies = Cookies.getAll();
   */
  getAll() {
    const cookies = document.cookie.split('; ')
    const result = {}
    for (const cookie of cookies) {
      if (cookie.startsWith(COOKIE_PREFIX)) {
        const [key, value] = cookie.split('=')
        result[decodeURIComponent(key.substring(COOKIE_PREFIX.length))] = decodeURIComponent(value)
      }
    }
    return result
  },
}

// 示例：修改通用前缀
// COOKIE_PREFIX = 'myapp_';

export default Cookies
