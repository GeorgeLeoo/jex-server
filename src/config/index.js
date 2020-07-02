const _whiteList = require('./../../configuration/whiteList.json')
exports.whiteList = function () {
  const keys = Object.keys(_whiteList)
  const flg = keys.every(v => {
    if (!v.includes('_')) {
      return false
    }
    const vs = v.split('_')
    if (vs[0] !== 'url') {
      return false
    }
    return Number.isInteger(Number(vs[1]))
  })
  if (!flg) {
    throw new Error('The whiteList key must like this: url_1, url_2, url_3')
  }
  return _whiteList
}
