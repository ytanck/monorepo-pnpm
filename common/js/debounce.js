/**
 * 函数防抖
 * @param func
 * @param wait
 * @returns
 */
 export default function (func, wait) {
  let timer
  return function () {
      /* eslint-disable prefer-rest-params */
      const args = arguments // arguments中存着e

      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
          func.apply(this, args)
      }, wait)
  }
}


