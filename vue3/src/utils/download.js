import request from '@/api/index.js'
/**
 * 从指定的 URL 下载文件，并跟踪下载进度。
 * @param {string} url - 要下载的文件的 URL。
 * @param {function} [onProgress] - 可选的回调函数，用于跟踪下载进度。
 *                                  该函数接收一个参数，表示下载进度百分比（0-100）。
 * @returns {Promise<void>} - 返回一个 Promise，下载成功时会 resolve。
 * @throws {Error} - 如果下载失败，会抛出一个错误。
 *
 * @example
 * const fileUrl = 'https://example.com/file.zip';
 *
 * downloadFile(fileUrl, (progress) => {
 *     console.log(`下载进度: ${progress}%`);
 * })
 * .then(() => console.log('下载成功！'))
 * .catch((error) => console.error('下载失败:', error.message));
 */
async function downloadFile(url, onProgress) {
  if (typeof url !== 'string') {
    throw new TypeError('The "url" parameter must be a string.')
  }

  try {
    const response = await request.get(url, { responseType: 'blob' })

    const contentLength = response.headers['content-length']
    const totalBytes = contentLength ? Number.parseInt(contentLength, 10) : null

    const reader = response.data.stream().getReader()
    let receivedBytes = 0
    const chunks = []

    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      chunks.push(value)
      receivedBytes += value.length

      if (onProgress && totalBytes) {
        const progress = Math.round((receivedBytes / totalBytes) * 100)
        onProgress(progress)
      }
    }

    const blob = new Blob(chunks)
    const downloadUrl = window.URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = downloadUrl
    anchor.download = url.split('/').pop()
    document.body.appendChild(anchor)
    anchor.click()

    // Cleanup
    window.URL.revokeObjectURL(downloadUrl)
    document.body.removeChild(anchor)

    if (onProgress) {
      onProgress(100) // Ensure progress is reported as 100% upon completion
    }
  }
  catch (error) {
    throw new Error(`Download failed: ${error.message}`)
  }
}

export default downloadFile
