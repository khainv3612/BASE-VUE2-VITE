/**
 * @param {string} money
 * @returns {String}
 */
import moment from 'moment'

export function formatVnMoney(money) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return money !== '' && money !== null && money !== undefined ? formatter.format(money) : ''
}

const zeroPad = (num, pad) => {
  return String(num).padStart(pad, '0')
}

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export const parseTimestamp = (timestamp, format = '') => {
  if (!timestamp) return

  const date = timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : timestamp

  if (format === 'HH:mm') {
    return `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`
  } else if (format === 'DD MMMM YYYY') {
    const options = { month: 'long', year: 'numeric', day: 'numeric' }
    return `${new Intl.DateTimeFormat('en-GB', options).format(date)}`
  } else if (format === 'DD/MM/YY') {
    const options = { month: 'numeric', year: 'numeric', day: 'numeric' }
    return `${new Intl.DateTimeFormat('en-GB', options).format(date)}`
  } else if (format === 'DD MMMM, HH:mm') {
    const options = { month: 'long', day: 'numeric' }
    return `${new Intl.DateTimeFormat('en-GB', options).format(
      date
    )}, ${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`
  }

  return date
}

export const formatTimestamp = (date, timestamp) => {
  const timestampFormat = isSameDay(date, new Date()) ? 'HH:mm' : 'DD/MM/YY'
  const result = parseTimestamp(timestamp, timestampFormat)
  return timestampFormat === 'HH:mm' ? `Today, ${result}` : result
}

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
  str = str.replace(/\u02C6|\u0306|\u031B/g, '')
  str = str.replace(/ + /g, ' ')
  str = str.trim()
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
  return str
}

export function formatPrice(str) {
  return str ? str.toString().replace(/^0+/, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
}

export function convertDateTime(date) {
  const format = 'YYYY-MM-DD HH:mm'
  return date ? moment.utc(date, format).local().format(format) : ''
}

export function convertDate(date) {
  const format = 'DD/MM/YYYY'
  return date ? moment.utc(date, format).local().format(format) : ''
}

export function copyClipboard(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function convertTimestampToDate(date) {
  const format = 'DD/MM/YYYY'
  const str = moment.unix(date).format(format)
  return date ? str : ''
}

export function convertTimestampToTime(date) {
  const format = 'DD/MM/YYYY HH:mm'
  const str = moment.unix(date).format(format)
  return str.substring(11)
}

