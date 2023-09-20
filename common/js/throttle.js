/**
 * 节流
 * @param fn
 * @param interval
 * @returns
 */
 export default function (fn, interval = 500) {
  let preTime
  return function (params) {
      const nowTime = Date.now()
      if (preTime == null || (nowTime - preTime) > interval) {
          fn.call(this, params)
          preTime = nowTime
      }
  }
}

