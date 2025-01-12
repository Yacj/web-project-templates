const DEFAULT_PREFIX = import.meta.env.VITE_APP_PREFIX || 'app_'
const DEFAULT_EXPIRATION_DAYS = 365

/**
 * 获取完整的键名（带前缀）
 */
function getFullKey(key, prefix = DEFAULT_PREFIX) {
  return `${prefix}${key}`
}

/**
 * 计算过期时间戳
 */
function calculateExpiration(days = DEFAULT_EXPIRATION_DAYS) {
  return Date.now() + days * 24 * 60 * 60 * 1000
}

/**
 * 设置数据
 * @param key 键名
 * @param value 值
 * @param expirationDays 过期天数（可选）
 * @param prefix 前缀（可选）
 */
export function setStorage(
  key,
  value,
  expirationDays = DEFAULT_EXPIRATION_DAYS,
  prefix = DEFAULT_PREFIX,
) {
  try {
    const fullKey = getFullKey(key, prefix)
    const data = {
      value,
      expires: calculateExpiration(expirationDays),
    }
    localStorage.setItem(fullKey, JSON.stringify(data))
  }
  catch (error) {
    console.error('Error setting localStorage item:', error)
    throw new Error(`Failed to set localStorage item: ${key}`)
  }
}

/**
 * 获取数据
 * @param key 键名
 * @param defaultValue 默认值（可选）
 * @param prefix 前缀（可选）
 */
export function getStorage(key, defaultValue = '', prefix = DEFAULT_PREFIX) {
  try {
    const fullKey = getFullKey(key, prefix)
    const item = localStorage.getItem(fullKey)

    if (!item) { return defaultValue }

    const data = JSON.parse(item)

    // 检查是否过期
    if (data.expires && data.expires < Date.now()) {
      removeStorage(key, prefix)
      return defaultValue
    }

    return data.value
  }
  catch (error) {
    console.error('Error getting localStorage item:', error)
    return defaultValue
  }
}

/**
 * 删除数据
 * @param key 键名
 * @param prefix 前缀（可选）
 */
export function removeStorage(key, prefix = DEFAULT_PREFIX) {
  try {
    const fullKey = getFullKey(key, prefix)
    localStorage.removeItem(fullKey)
  }
  catch (error) {
    console.error('Error removing localStorage item:', error)
    throw new Error(`Failed to remove localStorage item: ${key}`)
  }
}

/**
 * 清除所有带有指定前缀的数据
 * @param prefix 前缀（可选）
 */
export function clearStorage(prefix = DEFAULT_PREFIX) {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key)
      }
    })
  }
  catch (error) {
    console.error('Error clearing localStorage:', error)
    throw new Error('Failed to clear localStorage')
  }
}

/**
 * 检查键是否存在且未过期
 * @param key 键名
 * @param prefix 前缀（可选）
 */
export function hasStorage(key, prefix = DEFAULT_PREFIX) {
  try {
    const fullKey = getFullKey(key, prefix)
    const item = localStorage.getItem(fullKey)

    if (!item) { return false }

    const data = JSON.parse(item)

    if (data.expires && data.expires < Date.now()) {
      removeStorage(key, prefix)
      return false
    }

    return true
  }
  catch (error) {
    console.error('Error checking localStorage item:', error)
    return false
  }
}

/**
 * 获取所有带有指定前缀的键
 * @param prefix 前缀（可选）
 */
export function getAllStorageKeys(prefix = DEFAULT_PREFIX) {
  try {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .map(key => key.slice(prefix.length))
  }
  catch (error) {
    console.error('Error getting localStorage keys:', error)
    return []
  }
}

/**
 * 更新数据的过期时间
 * @param key 键名
 * @param expirationDays 新的过期天数
 * @param prefix 前缀（可选）
 */
export function updateStorageExpiration(
  key,
  expirationDays,
  prefix = DEFAULT_PREFIX,
) {
  try {
    const fullKey = getFullKey(key, prefix)
    const item = localStorage.getItem(fullKey)

    if (!item) { return false }

    const data = JSON.parse(item)
    data.expires = calculateExpiration(expirationDays)

    localStorage.setItem(fullKey, JSON.stringify(data))
    return true
  }
  catch (error) {
    console.error('Error updating expiration:', error)
    return false
  }
}

export const storage = {
  set: setStorage,
  get: getStorage,
  remove: removeStorage,
  clear: clearStorage,
  has: hasStorage,
  getAllKeys: getAllStorageKeys,
  updateExpiration: updateStorageExpiration,
}
