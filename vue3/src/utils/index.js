/**
 * 将字符串的首字母转换为大写
 * @param {string} str - 要转换的字符串
 * @returns {string} 首字母大写后的字符串
 * @example
 * firstUpperCase('hello') // => 'Hello'
 * firstUpperCase('world') // => 'World'
 */
export function firstUpperCase(str) {
  if (!str) {
    return str
  }
  return str[0].toUpperCase().concat(str.substring(1, str.length))
}

/**
 * 修改数组中的对象的键名和键值
 * @param {Array} array - 需要修改的数组
 * @param {object} map - 键名映射对象，例如 { oldKey: 'newKey' }
 * @param {boolean} [isChildren] - 是否遍历嵌套的子对象
 * @returns {Array} 修改后的数组
 * @example
 * const arr = [
 *   { id: 1, name: 'apple', price: 10 },
 *   { id: 2, name: 'banana', price: 20 },
 *   { id: 3, name: 'orange', price: 30, children: [   // 嵌套对象
 *     { id: 4, name: 'pear', price: 40 },
 *     { id: 5, name: 'grape', price: 50 }
 *   ] }
 * ]
 * const map = { id: 'itemId', name: 'itemName', price: 'itemPrice' }
 * const newArr = modifyArrayKeys(arr, map, true)
 * console.log(newArr) // => [
 *   { itemId: 1, itemName: 'apple', itemPrice: 10 },
 *   { itemId: 2, itemName: 'banana', itemPrice: 20 },
 *   { itemId: 3, itemName: 'orange', itemPrice: 30, children: [
 *     { itemId: 4, itemName: 'pear', itemPrice: 40 },
 *     { itemId: 5, itemName: 'grape', itemPrice: 50 }
 *   ] }
 */
export function transformKeyValue(array, map, isChildren = false) {
  if (!Array.isArray(array) || typeof map !== 'object') {
    throw new TypeError('Invalid input: array must be an array and map must be an object')
  }
  return array.map((item) => {
    const newItem = {}

    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const newKey = map[key] || key // 如果 map 中有对应的新键名，则使用新键名，否则保留原键名
        newItem[newKey] = item[key]

        // 如果 isChildren 为 true 且当前值是对象或数组，则递归处理
        if (isChildren && (typeof item[key] === 'object' && item[key] !== null)) {
          if (Array.isArray(item[key])) {
            newItem[newKey] = transformKeyValue(item[key], map, isChildren)
          }
          else {
            newItem[newKey] = transformKeyValue([item[key]], map, isChildren)[0]
          }
        }
      }
    }

    return newItem
  })
}

/**
 * 获取 URL 参数
 * @param {string} url - URL 字符串
 * @returns {object} 参数对象
 * @example
 * const url = 'https://www.example.com?id=123&name=John%20Doe'
 * const params = getUrlParams(url)
 * console.log(params) // => { id: '123', name: 'John Doe' }
 */
export function getUrlParams(url) {
  const params = {}
  new URL(url).searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

/**
 * 封装 async/await 的错误捕获，并支持超时
 * @param {Promise} promise - 需要执行的异步操作
 * @param {number} timeout - 超时时间（毫秒）
 * @returns {Promise<[any, Error]>} 返回一个数组，第一个元素是结果，第二个元素是错误
 * @example
 * const promise = new Promise((resolve, reject) => {
 *   setTimeout(() => {
 *     resolve('success')
 *   }, 1000)
 * })
 * const [result, error] = await asyncWrapperWithTimeout(promise, 500)
 * if (error) {
 *   console.error(error)
 * } else {
 *   console.log(result)
 * }
 */
export async function asyncHandler(promise, timeout) {
  try {
    const result = await Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout!')), timeout),
      ),
    ])
    return [result, null]
  }
  catch (error) {
    return [null, error]
  }
}

/**
 * 根据指定属性对数组对象去重
 * @param {Array} array - 需要去重的数组
 * @param {string|string[]} key - 用于比较的键名或键名数组
 * @returns {Array} 去重后的数组
 * @example
 * const arr = [
 *   { id: 1, name: 'apple', price: 10 },
 *   { id: 2, name: 'banana', price: 20 },
 *   { id: 3, name: 'orange', price: 30 },
 *   { id: 2, name: 'pear', price: 40 },
 *   { id: 1, name: 'grape', price: 50 }
 * ]
 * const newArr = uniqueArrayByKey(arr, 'id')
 * console.log(newArr) // => [
 *   { id: 1, name: 'apple', price: 10 },
 *   { id: 2, name: 'banana', price: 20 },
 *   { id: 3, name: 'orange', price: 30 },
 *   { id: 1, name: 'grape', price: 50 }
 */
export function uniqueArrayByKey(array, key) {
  const seen = new Set()
  return array.filter((item) => {
    // 如果是多个键名，生成唯一性标识
    const identifier = Array.isArray(key)
      ? key.map(k => item[k]).join('|')
      : item[key]
    if (seen.has(identifier)) {
      return false
    }
    seen.add(identifier)
    return true
  })
}

/**
 * 判断是否是开发环境
 * @returns {boolean}
 */
export function isDev() {
  return import.meta.env.MODE === 'development'
}
