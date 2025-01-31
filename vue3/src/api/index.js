import { isDev } from '@/utils/index.js'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { getToken } from '@/utils/auth'

/** @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig */

const BASE_URL = isDev && import.meta.env.VITE_OPEN_PROXY === 'true'
  ? '/proxy/'
  : import.meta.env.VITE_APP_API_BASEURL

// 创建 Axios 实例
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 错误代码映射表
const HttpErrorMap = {
  400: '请求参数错误',
  401: '身份验证失败，请重新登录',
  403: '无权访问该资源',
  404: '请求资源不存在',
  405: '请求方法不允许',
  408: '请求超时',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

const BusinessErrorMap = {
  1001: '业务操作失败',
  1002: '数据验证错误',
  // 添加更多业务错误码...
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.hideProgress) {
      NProgress.start()
    }

    // 自动携带 Token 逻辑示例
    // const token = getToken()
    // if (token && !config.anonymous) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done()

    // 处理二进制响应（如文件下载）
    if (response.config.responseType === 'blob') {
      return response.data
    }

    const { code, data, message } = response.data

    // 处理业务层错误
    if (code !== 200) {
      const errorMessage = BusinessErrorMap[code] || message || '未知业务错误'
      return Promise.reject(new Error(errorMessage))
    }

    return data
  },
  (error) => {
    NProgress.done()

    // 处理取消请求的特殊情况
    if (axios.isCancel(error)) {
      return Promise.reject(new Error('请求已取消'))
    }

    // 处理 HTTP 错误
    const status = error.response?.status
    let errorMessage = error.message

    if (status) {
      errorMessage = HttpErrorMap[status] || `HTTP 错误: ${status}`

      // 自动处理 401 错误
      if (status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(new Error(errorMessage))
  },
)

/**
 * 创建可取消的请求对象
 * @typedef {object} RequestTask
 * @property {Promise} promise - 请求 Promise
 * @property {Function} cancel - 取消请求的方法
 */

/**
 * 核心请求方法
 * @param {AxiosRequestConfig} config
 * @returns {RequestTask} - 可取消的请求对象
 */
function createRequest(config) {
  const controller = new AbortController()

  const promise = service({
    ...config,
    signal: controller.signal,
  })

  return {
    promise,
    cancel: () => controller.abort(),
  }
}

// 封装常用请求方法
const request = {
  get(url, params, config) {
    return createRequest({ ...config, method: 'GET', url, params })
  },

  post(url, data, config) {
    return createRequest({ ...config, method: 'POST', url, data })
  },

  put(url, data, config) {
    return createRequest({ ...config, method: 'PUT', url, data })
  },

  delete(url, params, config) {
    return createRequest({ ...config, method: 'DELETE', url, params })
  },

  upload(url, file, config) {
    const formData = new FormData()
    formData.append('file', file)

    return createRequest({
      ...config,
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
  },
}

export default request
