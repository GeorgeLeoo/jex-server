const _whiteList = require('./../../configuration/whiteList.json')
const systemWhiteList = require('./system/systemWhiteList.json')
const getWhiteList = function () {
  const list = Object.assign({}, systemWhiteList, _whiteList)
  const keys = Object.keys(list)
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
  return Object.values(list)
}

module.exports = {
  whiteList: getWhiteList()
}
