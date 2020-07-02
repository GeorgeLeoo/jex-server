const ResponseCode = require('./../../utils/ResponseCode')
const { setValue } = require('../../utils/redis')
const { getDB } = require('./../../utils')
const User = 'User'

function signUp ({ user }) {
  return new Promise(resolve => {
    getDB(User).insertMany(user, (err, docs) => {
        if (err) {
          resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
        } else {
          resolve({ code: ResponseCode.SUCCESS, msg: 'ok', data: docs })
        }
      }
    )
  })
}

function signIn ({ username, password }) {
  return new Promise(resolve => {
    getDB(User).find({ username, password }, async (err, users) => {
      if (err) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: err })
      } else if (users.length === 0) {
        resolve({ code: ResponseCode.SERVICE_ERROR, msg: '账号或密码错误' })
      } else {
        // 生成token
        let token = utils.accessToken({ username })
        // 存储当前用户到redis，实现在线人数
        const data = users[0]
        if (data && data.uid && data.token) {
          setValue(data.token, data.uid)
        }
        resolve({ code: ResponseCode.SUCCESS, msg: 'ok', token: token.token, uid: data._id })
      }
    })
  })
}

module.exports = {
  signUp,
  signIn
}
