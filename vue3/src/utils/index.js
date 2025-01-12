/**
 * 将字符串的首字母转换为大写
 * @param {string} str - 要转换的字符串
 * @returns {string} 首字母大写后的字符串
 * @example
 * firstUpperCase('hello') // => 'Hello'
 * firstUpperCase('world') // => 'World'
 */
export function firstUpperCase(str) {
  if (!str) { return str }
  return str[0].toUpperCase().concat(str.substring(1, str.length))
}
