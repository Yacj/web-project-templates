/**
 * @fileoverview
 * 简单的日志工具，支持警告、错误、信息、调试日志，
 * 并提供防止重复日志输出的功能。使用 `dayjs` 进行时间格式化。
 */

import { isDev } from '@/utils/index.js' // 引入 dayjs 处理时间
import dayjs from 'dayjs'

const logSet = new Set() // 存储已记录的日志，防止重复
const TITLE = import.meta.env.VITE_APP_TITLE || 'Title' // 应用标题
const PREFIX = isDev() ? `[DEV][${TITLE}]` : `[PROD][${TITLE}]` // 日志前缀

/**
 * 格式化日志信息
 * @param {string} level 日志级别（warn、error、info、debug）
 * @param {string} message 日志内容
 * @returns {string} 格式化后的日志信息
 */
function formatMessage(level, message) {
  const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss') // 格式化时间
  return `[${timestamp}] ${PREFIX} ${level.toUpperCase()}: ${message}`
}

const log = {
  /**
   * 输出警告日志
   * @param {string} message 日志内容
   */
  warn(message) {
    console.warn(formatMessage('warn', message))
  },

  /**
   * 仅输出一次警告日志（去重）
   * @param {string} message 日志内容
   */
  warnOnce(message) {
    const msgContent = formatMessage('warn', message)
    if (logSet.has(msgContent)) {
      return
    }
    logSet.add(msgContent)
    console.warn(msgContent)
  },

  /**
   * 输出错误日志
   * @param {string} message 日志内容
   */
  error(message) {
    console.error(formatMessage('error', message))
  },

  /**
   * 仅输出一次错误日志（去重）
   * @param {string} message 日志内容
   */
  errorOnce(message) {
    const msgContent = formatMessage('error', message)
    if (logSet.has(msgContent)) { return }
    logSet.add(msgContent)
    console.error(msgContent)
  },

  /**
   * 输出普通信息日志
   * @param {string} message 日志内容
   */
  info(message) {
    console.info(formatMessage('info', message))
  },

  /**
   * 输出调试日志
   * @param {string} message 日志内容
   */
  debug(message) {
    console.debug(formatMessage('debug', message))
  },
  /**
   * 以表格形式输出数据（适用于数组或对象）
   * @param {object | Array} data 需要表格化展示的数据
   * @param {string} [title] 日志标题（可选）
   */
  table(data, title = '日志数据') {
    if (typeof console.table === 'function') {
      console.group(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${PREFIX} TABLE: ${title}`)
      console.table(data)
      console.groupEnd()
    }
    else {
      console.info(formatMessage('info', `您的环境不支持 console.table，原始数据: `), data)
    }
  },
}

export default log
