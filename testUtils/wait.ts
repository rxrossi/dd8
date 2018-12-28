export default (ms: number = 0) =>
  new Promise(resolve => {
    return setTimeout(() => resolve(), ms)
  })
