import { firstUpperCase } from '@/utils/index.js'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayJsIsBetween from 'dayjs/plugin/isBetween'
import localeData from 'dayjs/plugin/localeData'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { chunk, isFunction } from 'lodash-es'

// 扩展 dayjs 插件
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(localeData)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(dayJsIsBetween)

/**
 * 日期格式化
 * @param {Date} date - 日期对象
 * @param {string} format - 格式化字符串
 * @returns {string} 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // => '2024-01-12 12:00:00'
 */
export function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

/**
 * 获取指定年月的第一天日期
 * @param {object} dateObj - 日期对象
 * @param {number} dateObj.year - 年份
 * @param {number} dateObj.month - 月份（0-11）
 * @returns {Date} 该月第一天的日期对象
 * @example
 * getFirstDayOfMonth({ year: 2024, month: 0 }) // => Date(2024-01-01)
 */
export function getFirstDayOfMonth({ year, month }) {
  return new Date(year, month, 1)
}

/**
 * 获取指定年份和月份的天数
 *
 * @param {object} params - 参数对象
 * @param {number} [params.year] - 指定的年份，默认是当前年份
 * @param {number} [params.month] - 指定的月份（1-12），默认是当前月份
 * @returns {number} 指定月份的天数
 *
 * @example
 * // 获取2023年2月的天数
 * getDaysInMonth({ year: 2023, month: 2 }); // 返回 28
 *
 * @example
 * // 获取当前月份的天数
 * getDaysInMonth({});
 */
export function getDaysInMonth({ year = dayjs().year(), month = dayjs().month() + 1 } = {}) {
  if (month < 1 || month > 12) {
    throw new Error('月份必须在1到12之间')
  }

  return dayjs(`${year}-${month}-01`).daysInMonth()
}

/**
 * 获取指定年月的最后一天日期
 * @param {object} dateObj - 日期对象
 * @param {number} dateObj.year - 年份
 * @param {number} dateObj.month - 月份（0-11）
 * @returns {Date} 该月最后一天的日期对象
 * @example
 * getLastDayOfMonth({ year: 2024, month: 0 }) // => Date(2024-01-31)
 */
export function getLastDayOfMonth({ year, month }) {
  return new Date(year, month, getDaysInMonth({ year, month }))
}

/**
 * 判断两个日期是否在同一年
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @returns {boolean} 是否同年
 * @example
 * isSameYear(new Date('2024-01-01'), new Date('2024-12-31')) // => true
 */
export function isSameYear(date1, date2) {
  return date1.getFullYear() === date2.getFullYear()
}

/**
 * 判断两个日期是否在同一季度
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @returns {boolean} 是否同季度
 * @example
 * isSameQuarter(new Date('2024-01-01'), new Date('2024-03-31')) // => true
 */
export function isSameQuarter(date1, date2) {
  return isSameYear(date1, date2) && dayjs(date1).quarter() === dayjs(date2).quarter()
}

/**
 * 判断两个日期是否在同一月
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @returns {boolean} 是否同月
 * @example
 * isSameMonth(new Date('2024-01-01'), new Date('2024-01-31')) // => true
 */
export function isSameMonth(date1, date2) {
  return isSameYear(date1, date2) && date1.getMonth() === date2.getMonth()
}

/**
 * 判断两个日期是否在同一周
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @param {string} [dayjsLocale] - 地区设置
 * @returns {boolean} 是否同周
 * @example
 * isSameWeek(new Date('2024-01-01'), new Date('2024-01-07'), 'zh-cn') // => true
 */
export function isSameWeek(date1, date2, dayjsLocale = 'zh-cn') {
  return isSameMonth(date1, date2) && dayjs(date1).locale(dayjsLocale).week() === dayjs(date2).locale(dayjsLocale).week()
}

/**
 * 判断两个日期是否是同一天
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @returns {boolean} 是否同一天
 * @example
 * isSameDate(new Date('2024-01-01 10:00'), new Date('2024-01-01 20:00')) // => true
 */
export function isSameDate(date1, date2) {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate()
}

/**
 * 比较两个日期的时间戳
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @returns {number} 比较结果：-1 表示 date1 早于 date2，1 表示 date1 晚于 date2，0 表示相等
 * @example
 * compareAsc(new Date('2024-01-01'), new Date('2024-01-02')) // => -1
 */
export function compareAsc(date1, date2) {
  const d1 = date1.getTime()
  const d2 = date2.getTime()

  if (d1 < d2) {
    return -1
  }
  if (d1 > d2) {
    return 1
  }
  return 0
}

/**
 * 判断两个日期是否相同（可指定比较精度）
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @param {string} [type] - 比较类型：'date'|'month'|'year'|'week'|'quarter'
 * @param {string} [dayjsLocale] - 地区设置
 * @returns {boolean} 比较结果
 * @example
 * isSame(new Date('2024-01-01'), new Date('2024-01-01'), 'date') // => true
 * isSame(new Date('2024-01-01'), new Date('2024-01-31'), 'month') // => true
 */
export function isSame(date1, date2, type = 'date', dayjsLocale = 'zh-cn') {
  const func = {
    isSameYear,
    isSameQuarter,
    isSameMonth,
    isSameWeek,
    isSameDate,
  }
  return func[`isSame${firstUpperCase(type)}`](date1, date2, dayjsLocale)
}

/**
 * 判断日期是否超出范围
 * @param {Date} date - 要判断的日期
 * @param {Date} min - 最小日期
 * @param {Date} max - 最大日期
 * @returns {boolean} 是否超出范围
 * @example
 * outOfRanges(new Date('2024-01-01'), new Date('2023-12-31'), new Date('2024-12-31')) // => false
 */
export function outOfRanges(date, min, max) {
  return (min && compareAsc(date, min) === -1) || (max && compareAsc(date, max) === 1)
}

/**
 * 获取今天零点的日期对象
 * @returns {Date} 今天零点的日期对象
 * @example
 * getToday() // => Date(2024-01-12 00:00:00)
 */
export function getToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
}
/**
 * 设置日期对象的时间部分
 * @param {Date} date - 原始日期对象
 * @param {number} hours - 小时（0-23）
 * @param {number} minutes - 分钟（0-59）
 * @param {number} seconds - 秒（0-59）
 * @param {number} [milliseconds] - 毫秒（0-999）
 * @returns {Date} 设置时间后的新日期对象
 * @example
 * setDateTime(new Date('2024-01-12'), 14, 30, 0) // => Date(2024-01-12 14:30:00)
 */
export function setDateTime(date, hours, minutes, seconds, milliseconds = 0) {
  return dayjs(date)
    .hour(hours)
    .minute(minutes)
    .second(seconds)
    .millisecond(milliseconds)
    .toDate()
}

/**
 * 减少指定月份数
 * @param {Date} date - 起始日期
 * @param {number} num - 要减少的月份数
 * @returns {Date} 减少月份后的新日期
 * @example
 * subtractMonth(new Date('2024-01-12'), 1) // => Date(2023-12-12)
 */
export function subtractMonth(date, num) {
  return dayjs(date).subtract(num, 'month').toDate()
}

/**
 * 增加指定月份数
 * @param {Date} date - 起始日期
 * @param {number} num - 要增加的月份数
 * @returns {Date} 增加月份后的新日期
 * @example
 * addMonth(new Date('2024-01-12'), 1) // => Date(2024-02-12)
 */
export function addMonth(date, num) {
  return dayjs(date).add(num, 'month').toDate()
}

/**
 * 获取季度数据
 * @param {number} year - 年份
 * @param {object} options - 配置选项
 * @param {Function} [options.disableDate] - 禁用日期的判断函数
 * @param {Date} [options.minDate] - 可选择的最小日期
 * @param {Date} [options.maxDate] - 可选择的最大日期
 * @param {Array<string>} [options.quarterLocal] - 季度的本地化文本
 * @param {string} [options.dayjsLocale] - 地区设置
 * @param {boolean} [options.cancelRangeSelectLimit] - 是否取消范围选择的限制
 * @returns {Array} 季度数据
 * @example
 * getQuarters(2024, {
 *   quarterLocal: ['第一季度', '第二季度', '第三季度', '第四季度']
 * })
 */
export function getQuarters(year, options) {
  const {
    disableDate = date => false,
    minDate,
    maxDate,
    quarterLocal,
    dayjsLocale = 'zh-cn',
    cancelRangeSelectLimit = false,
  } = options

  const quarterArr = []
  const today = getToday()

  for (let i = 1; i <= 4; i++) {
    const date = dayjs(new Date(year, 0)).quarter(i).toDate()

    quarterArr.push({
      value: date,
      now: isSame(date, today, 'quarter'),
      disabled: (isFunction(disableDate) && disableDate(date))
        || (!cancelRangeSelectLimit && outOfRanges(date, minDate, maxDate)),
      active: false,
      text: quarterLocal[i - 1],
      dayjsObj: dayjs(date).locale(dayjsLocale),
    })
  }

  return chunk(quarterArr, 4)
}
