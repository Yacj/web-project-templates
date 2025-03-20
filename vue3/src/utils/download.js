import log from '@/utils/log.js'
import axios from 'axios'

/**
 * 从指定的 URL 下载文件，并跟踪下载进度。
 * @param {string} url - 要下载的文件的 URL。
 * @param {Function} [onProgress] - 可选的回调函数，用于跟踪下载进度。
 * 该函数接收一个参数，表示下载进度百分比（0-100）。
 * @returns {Promise<void>} - 返回一个 Promise，下载成功时会 resolve。
 * @throws {Error} - 如果下载失败，会抛出一个错误。
 *
 * @example
 * const fileUrl = 'https://example.com/file.zip';
 *
 * downloadFile(fileUrl, (progress) => {
 *   console.log(`下载进度: ${progress}%`);
 * })
 * .then(() => console.log('下载成功！'))
 * .catch((error) => console.error('下载失败:', error.message));
 */
export async function downloadFile(url, onProgress) {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        if (typeof onProgress === 'function' && progressEvent.total > 0) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percent)
        }
      },
    })

    // 从响应头或URL中提取文件名
    const fileName = getFileNameFromHeaders(response.headers, url)

    // 创建Blob链接并触发下载
    const blob = new Blob([response.data])
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()

    // 清理资源
    window.URL.revokeObjectURL(downloadUrl)
    document.body.removeChild(link)
  }
  catch (error) {
    log.error(`下载失败：${error.message}`)
    let errorMessage = '下载失败'
    if (error.response) {
      errorMessage += `，状态码：${error.response.status}`
    }
    else if (error.request) {
      errorMessage += '，无服务器响应'
    }
    else {
      errorMessage += `：${error.message}`
    }
    throw new Error(errorMessage)
  }
}

/**
 * 从响应头或URL中提取文件名
 * @private
 */
function getFileNameFromHeaders(headers, url) {
  // 从Content-Disposition头中提取文件名
  const contentDisposition = headers['content-disposition']
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename\*?=["']?(?:UTF-\d['"]*)?([^;"']*)["']?/i)
    if (filenameMatch && filenameMatch[1]) {
      return decodeURIComponent(filenameMatch[1])
    }
  }

  // 从URL路径中提取文件名
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    return pathname.split('/').pop() || 'download'
  }
  catch {
    return 'download'
  }
}
