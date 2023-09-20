export const repeatArr = (arr, times) => {
  let res = []
  while (times--) {
    for (let item of arr) {
      res.push(item)
    }
  }
  return res
}

export const sleep = (time = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export const maxWait = async (promiseObj, time = 0) => {
  return await Promise.race([
    promiseObj,
    sleep(time),
  ])
}

export const px2rem = (px) => px / 75