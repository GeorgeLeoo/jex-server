const Response = require('../utils/Response')
const UserDB = require('./../db/module/userDB')
const ResponseCode = require('../utils/ResponseCode')
// const { delValue } = require('../utils/redis')

async function signUp ({ req, res }) {
  const response = new Response({ req, res })
  const { username, password } = req.body
  if (!username) {
    response.send({ code: ResponseCode.CLIENT_ERROR, msg: 'The username can not be undefined.' })
    return
  }
  if (!password) {
    response.send({ code: ResponseCode.CLIENT_ERROR, msg: 'The password can not be undefined.' })
    return
  }
  const { code, msg, data } = await UserDB.signUp({ username, password })
  response.send({ code, msg, data })
}

async function signIn ({ req, res }) {
  const { username, password } = req.body
  const { code, msg, data } = await UserDB.signIn({ username, password })
  const response = new Response({ req, res })
  response.send({ code, msg, data })
}

async function getCurrent ({ req, res }) {
  const body = req.body
  console.log(body)
  res.send({ code: 200 })
}

async function logout ({ req, res }) {
  const token = req.headers['jex-token']
  // delValue(token)
  const response = new Response({ req, res })
  response.send({ code: ResponseCode.SUCCESS })
}

module.exports = {
  signUp,
  signIn,
  getCurrent,
  logout
}
