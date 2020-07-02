/**
 * 银行
 */
const { Response, isEmpty } = require('../utils')
const BankDB = require('../db/modules/bankDB')
const { YES } = require('../config/modules/other')

/**
 *  查询所有银行信息，支持条件查询
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getBanks ({ req, res }) {
  let { name, page } = req.query
  let query = { status: YES }
  if (name) {
    query = { ...query, name: { $regex: name } }
  }
  if (page) {
    page = JSON.parse(page)
  }
  const { code, msg, data } = await BankDB.getBanks(query, page)
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

/**
 * 创建银行信息
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createBanks ({ req, res }) {
  const response = new Response({ res })
  
  const { name, url } = req.body
  
  const checkList = [
    { data: name, errMsg: '银行名称不能为空' },
    { data: url, errMsg: '银行链接不能为空' }
  ]
  const checkListResult = isEmpty(checkList)
  if (checkListResult.status) {
    response.sendClientError(checkListResult.errMsg)
    return
  }
  
  const { code, msg, data } = await BankDB.createBanks({ name, url })
  response.send({ code, msg, data })
}

/**
 * 通过 id 更新银行信息
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateBanksByID ({ req, res }) {
  const { name, url, id } = req.body
  const { code, msg, data } = await BankDB.updateBanksByID({ name, url, id })
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

/**
 * 根据银行 id 删除
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteBankByID ({ req, res }) {
  const { id } = req.query
  const { code, msg, data } = await BankDB.deleteBankByID(id)
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

module.exports = {
  getBanks,
  createBanks,
  updateBanksByID,
  deleteBankByID
}
