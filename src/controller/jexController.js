const Response = require('../utils/Response')
const JexController = require('../controller/je')

async function getJex ({ req, res }) {
  const { query, page, order, selects = [], unSelects = [], reference = [] } = req.body
  const orderMap = {}
  if (order) {
    const orderKeys = Object.keys(order)
    if (orderKeys.length > 0) {
      if (order[orderKeys[0]] === 'desc') {
        orderMap[orderKeys[0]] = '-1'
      }
      if (order[orderKeys[0]] === 'asc') {
        orderMap[orderKeys[0]] = '1'
      }
    }
  }
  const selectMap = {}
  selects.map(v => {
    selectMap[v] = 1
  })
  if (!selects.includes('_id')) {
    selectMap['_id'] = 0
  }
  unSelects.map(v => {
    selectMap[v] = 0
  })
  const { code, msg, data } = await JexDB.getBanks(query, page)
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

function getCount({ req, res }) {}

function updateJex({ req, res }) {}

function removeJex({ req, res }) {}

function incrementJex({ req, res }) {}

module.exports = {
  getJex,
  getCount,
  updateJex,
  removeJex,
  incrementJex
}
