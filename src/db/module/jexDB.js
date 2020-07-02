const ResponseCode = require('./../../utils/ResponseCode')
const { getDB } = require('./../../utils')

function getJex ({ collectionName, query, filter, reference, page = { limitNumber: 100, skipNumber: 1 }, orderMap }) {
  return new Promise(resolve => {
    if (!collectionName) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The collectionName can not be undefined.' })
    }
    const DB = getDB(collectionName)
    DB.find(query, filter)
      .populate(reference)
      .limit(parseInt(page.limitNumber))
      .skip((parseInt(page.skipNumber) - 1) * parseInt(page.limitNumber))
      .sort(orderMap)
      .exec((err, docs) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        } else {
          resolve({ code: ResponseCode.SUCCESS, msg: 'ok', data: docs })
        }
      })
  })
}

function getCount ({ collectionName, query }) {
  return new Promise(resolve => {
    if (!collectionName) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The collectionName can not be undefined.' })
    }
    if (!query || Object.keys(query).length === 0) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The query can not be undefined or {}.' })
    }
    const DB = getDB(collectionName)
    DB.countDocuments(query, function (err, count) {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      } else {
        resolve({ code: ResponseCode.SUCCESS, msg: 'ok', data: { count } })
      }
    })
  })
}

function updateJex ({ collectionName, query, update }) {
  return new Promise(resolve => {
    if (!collectionName) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The collectionName can not be undefined.' })
    }
    if (!query || Object.keys(query).length === 0) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The query can not be undefined or {}.' })
    }
    if (!update || Object.keys(update).length === 0) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The update can not be undefined or {}.' })
    }
    const DB = getDB(collectionName)
    DB.updateMany(query, { $set: update }, (err, docs) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      } else {
        if (docs.n === 1 && docs.ok === 1 && docs.nModified === 1) {
          resolve({ code: ResponseCode.SUCCESS, msg: 'ok' })
        } else {
          resolve({ code: ResponseCode.SUCCESS, msg: 'no' })
        }
      }
    })
  })
}

function insertJex ({ collectionName, insertData }) {
  return new Promise(resolve => {
    if (!collectionName) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The collectionName can not be undefined.' })
    }
    if (!insertData || Object.keys(insertData).length === 0) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The insertData can not be undefined or {}.' })
    }
    const DB = getDB(collectionName)
    DB.insertMany(insertData, (err, docs) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      } else {
        resolve({ code: ResponseCode.SUCCESS, msg: 'ok', data: docs })
      }
    })
  })
}

function removeJex ({ collectionName, condition }) {
  return new Promise(resolve => {
    if (!collectionName) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The collectionName can not be undefined.' })
    }
    if (!condition || Object.keys(condition).length === 0) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The condition can not be undefined or {}.' })
    }
    const DB = getDB(collectionName)
    DB.remove(condition, (err, docs) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      } else {
        resolve({ code: ResponseCode.SUCCESS, msg: 'ok', data: docs })
      }
    })
  })
}
function incrementJex({collectionName, _id, incrementObj}) {
  return new Promise(resolve => {
    if (!collectionName) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The collectionName can not be undefined.' })
    }
    if (!_id) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The _id can not be undefined.' })
    }
    if (!incrementObj || Object.keys(incrementObj).length === 0) {
      resolve({ code: ResponseCode.SERVICE_ERROR, msg: 'The incrementObj can not be undefined or {}.' })
    }
    const DB = getDB(collectionName)
    DB.updateMany({ _id }, { $inc: incrementObj },(err, docs) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      } else {
        if (docs.n === 1 && docs.ok === 1 && docs.nModified === 1) {
          resolve({ code: ResponseCode.SUCCESS, msg: 'ok' })
        } else {
          resolve({ code: ResponseCode.SUCCESS, msg: 'no' })
        }
      }
    })
  })
}

module.exports = {
  getJex,
  getCount,
  updateJex,
  insertJex,
  removeJex,
  incrementJex
}
