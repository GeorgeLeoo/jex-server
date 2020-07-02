const ResponseCode = require('./../../utils/ResponseCode')
const { getDB } = require('./../../utils')

function getJex ({ collectionName, query, filter, reference, page = { limitNumber: 100, skipNumber: 1 }, orderMap }) {
  return new Promise(resolve => {
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
  removeJex,
  incrementJex
}
