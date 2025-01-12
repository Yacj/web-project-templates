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
 * 获取指定年月的天数
 * @param {object} dateObj - 日期对象
 * @param {number} dateObj.year - 年份
 * @param {number} dateObj.month - 月份（0-11）
 * @returns {number} 该月的总天数
 * @example
 * getDaysInMonth({ year: 2024, month: 1 }) // => 29 (闰年2月)
 */
export function getDaysInMonth({ year, month }) {
  return new Date(year, month + 1, 0).getDate()
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

  if (d1 < d2) { return -1 }
  if (d1 > d2) { return 1 }
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
 * 获取日历网格数据
 * @param {object} dateInfo - 日期信息
 * @param {number} dateInfo.year - 年份
 * @param {number} dateInfo.month - 月份（0-11）
 * @param {object} options - 配置选项
 * @param {number} options.firstDayOfWeek - 一周的第一天（0-6，0表示周日）
 * @param {boolean} [options.showWeekOfYear] - 是否显示年度周数
 * @param {Function} [options.disableDate] - 禁用日期的判断函数
 * @param {Date} [options.minDate] - 可选择的最小日期
 * @param {Date} [options.maxDate] - 可选择的最大日期
 * @param {string} [options.dayjsLocale] - 地区设置
 * @param {boolean} [options.cancelRangeSelectLimit] - 是否取消范围选择的限制
 * @returns {Array} 日历网格数据
 * @example
 * getWeeks(
 *   { year: 2024, month: 0 },
 *   { firstDayOfWeek: 1, showWeekOfYear: true }
 * )
 * // 返回一个 6x7 的网格数据，包含日期信息
 */
export function getWeeks({ year, month }, options) {
  const {
    firstDayOfWeek,
    showWeekOfYear = false,
    disableDate = currentDay => false,
    minDate,
    maxDate,
    dayjsLocale = 'zh-cn',
    cancelRangeSelectLimit = false,
  } = options

  const prependDay = getFirstDayOfMonth({ year, month })
  const appendDay = getLastDayOfMonth({ year, month })
  const maxDays = getDaysInMonth({ year, month })
  const daysArr = []
  const today = getToday()

  // 生成当月日期
  for (let i = 1; i <= maxDays; i++) {
    const currentDay = new Date(year, month, i)
    daysArr.push({
      text: i,
      active: false,
      value: currentDay,
      disabled: (isFunction(disableDate) && disableDate(currentDay))
        || (!cancelRangeSelectLimit && outOfRanges(currentDay, minDate, maxDate)),
      now: isSame(today, currentDay),
      firstDayOfMonth: i === 1,
      lastDayOfMonth: i === maxDays,
      type: 'current-month',
      dayjsObj: dayjs(currentDay).locale(dayjsLocale),
    })
  }

  // 补充上月日期
  if (prependDay.getDay() !== firstDayOfWeek) {
    prependDay.setDate(0)
    while (true) {
      daysArr.unshift({
        text: prependDay.getDate().toString(),
        active: false,
        value: new Date(prependDay),
        disabled: (isFunction(disableDate) && disableDate(currentDay))
          || (!cancelRangeSelectLimit && outOfRanges(prependDay, minDate, maxDate)),
        additional: true,
        type: 'prev-month',
        dayjsObj: dayjs(prependDay).locale(dayjsLocale),
      })
      prependDay.setDate(prependDay.getDate() - 1)
      if (prependDay.getDay() === Math.abs(firstDayOfWeek + 6) % 7) { break }
    }
  }

  // 补充下月日期
  const LEN = 42 // 6周 x 7天
  while (daysArr.length < LEN) {
    appendDay.setDate(appendDay.getDate() + 1)
    daysArr.push({
      text: appendDay.getDate(),
      active: false,
      value: new Date(appendDay),
      disabled: (isFunction(disableDate) && disableDate(currentDay))
        || (!cancelRangeSelectLimit && outOfRanges(appendDay, minDate, maxDate)),
      additional: true,
      type: 'next-month',
      dayjsObj: dayjs(appendDay).locale(dayjsLocale),
    })
  }

  // 分割成周数据
  const dataList = chunk(daysArr, 7)

  // 添加周数显示
  if (showWeekOfYear) {
    dataList.forEach((d) => {
      d.unshift({
        ...d[0],
        active: false,
        value: d[0].value,
        text: dayjs(d[0].value).locale(dayjsLocale).week(),
        dayjsObj: dayjs(d[0].value).locale(dayjsLocale),
      })
    })
  }

  return dataList
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