const Response = require('../utils/Response')
const JexDB = require('../db/module/jexDB')

async function getJex ({ req, res }) {
  const { query, page, order, selects = [], unSelects = [], reference = [] } = req.body
  const { collectionName } = req.params
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
  const { code, msg, data } = await JexDB.getJex({
    collectionName,
    query,
    filter: selectMap,
    reference,
    page,
    orderMap
  })
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

async function getCount ({ req, res }) {
  const { collectionName } = req.params
  const { code, msg, data } = await JexDB.getCount({ collectionName, query: req.body })
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

async function updateAndInsertJex ({ req, res }) {
  const { collectionName } = req.params
  const body = req.body
  const _id = body._id
  delete body._id
  let query = body.query
  let updateOrInsert = body.data
  if (_id) {
    query = { _id }
  }
  if (Object.keys(query).length > 0) {
    const { code, msg, data } = await JexDB.updateJex({ collectionName, query, update: updateOrInsert })
    const response = new Response({ req, res })
    response.send({ code, msg, data })
  } else {
    const { code, msg, data } = await JexDB.insertJex({ collectionName, insertData: updateOrInsert })
    const response = new Response({ req, res })
    response.send({ code, msg, data })
  }
}

async function removeJex ({ req, res }) {
  const { collectionName } = req.params
  const { code, msg, data } = await JexDB.removeJex({ collectionName, condition: req.body })
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

async function incrementJex ({ req, res }) {
  const { collectionName } = req.params
  const { _id, incrementObj = {} } = req.body
  if (typeof _id !== 'string') {
    res.send({ code: 1, msg: 'The _id must be String.' })
    return
  }
  if (!_id) {
    res.send({ code: 1, msg: 'The _id can not be undefined or ""' })
    return
  }
  if (Object.keys(incrementObj).length === 0) {
    res.send({ code: 1, msg: 'At a minimum, set the field name of the count' })
    return
  }
  if (typeof incrementObj[Object.keys(incrementObj)[0]] !== 'number') {
    res.send({ code: 1, msg: 'The value added must be a numeric type' })
    return
  }
  const { code, msg, data } = await JexDB.incrementJex({ collectionName, _id, incrementObj })
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

module.exports = {
  getJex,
  getCount,
  updateAndInsertJex,
  removeJex,
  incrementJex
}
