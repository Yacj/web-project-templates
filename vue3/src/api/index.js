import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/**
 * 自定义 Axios 配置
 * @typedef {object} CustomAxiosRequestConfig
 */

/**
 * 通用响应结构
 * @typedef {object} BaseResponse
 * @property {number} code - 响应状态码
 * @property {any} data - 响应数据
 * @property {string} message - 响应消息
 */

// 创建 Axios 实例
const service = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

// 错误代码映射表
const errorCodeMap = {
  400: '请求错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.hideLoading) {
      NProgress.start()
    }
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error.message || '请求错误')
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done()
    const { code } = response.data
    if (typeof code !== 'undefined' && code !== 200) {
      return Promise.reject(new Error(errorCodeMap[code] || '未知错误'))
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    NProgress.done()
    const status = error.response?.status
    const message = errorCodeMap[status] || error.message || '请求错误'
    return Promise.reject(message)
  },
)

/**
 * 封装请求对象
 */
const request = {
  /**
   * 发送 GET 请求
   * @param {string} url - 请求的 URL
   * @param {object} [params] - 请求参数
   * @returns {Promise<any>} - 包含请求结果的 Promise
   */
  get(url, params) {
    return request.request('GET', url, { params })
  },

  /**
   * 发送 POST 请求
   * @param {string} url - 请求的 URL
   * @param {object} [data] - 请求数据
   * @returns {Promise<any>} - 包含请求结果的 Promise
   */
  post(url, data) {
    return request.request('POST', url, { data })
  },

  /**
   * 发送上传文件请求
   * @param {string} url - 请求的 URL
   * @param {object} data - 文件数据
   * @returns {Promise<any>} - 包含请求结果的 Promise
   */
  upload(url, data) {
    const headers = { 'Content-Type': 'multipart/form-data' }
    return request.request('POST', url, { data, headers })
  },

  /**
   * 通用请求方法
   * @param {string} method - 请求方法 (GET, POST 等)
   * @param {string} url - 请求的 URL
   * @param {object} [config] - 请求配置
   * @returns {Promise<any>} - 包含请求结果的 Promise
   */
  request(method, url, config = {}) {
    return new Promise((resolve, reject) => {
      service({ method, url, ...config })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default request
