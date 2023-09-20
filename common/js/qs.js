export default {
  parse: (str = '') => {
    const arr = str.split('&')
    const obj = {}
    arr.forEach(item => {
      const index = item.indexOf('=')
      const key = item.slice(0, index)
      const val = item.slice(index + 1)
      if (key) {
        obj[key] = val
      }
    })
    return obj
  },
  stringify: (obj = {}) => {
    const arr = []
    for (const key in obj) {
      if (key) {
        arr.push(key + '=' + obj[key])
      }
    }
    return arr.join('&')
  },
}
