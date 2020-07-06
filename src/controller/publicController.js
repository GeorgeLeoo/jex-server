const svgCaptcha = require('svg-captcha')
const { setValue } = require('../utils/redis')
const { captchaOptions } = require('../config')
const Response = require('../utils/Response')
const emailServer = require('./../email')
const verifyTemplate = require('./../email/verifyTemplate')

async function getCaptcha ({ req, res }) {
  const { uuid } = req.body
  const captcha = svgCaptcha.create(captchaOptions)
  setValue(uuid, captcha.text.toLowerCase(), 43200)
  const response = new Response({ res })
  response.send({ data: captcha.data })
}

async function requestEmailVerify ({ req, res }) {
  const { email } = req.body
  const sendInfo = {
    to: 'georgeleeo@163.com',
    code: '2339',
    expire: '2020-10-02 10:22:34',
    user: '18921483103'
  }
  const emailData = verifyTemplate(sendInfo)
  const { code, msg, data } = await emailServer.send(emailData)
  const response = new Response({ res })
  response.send({ code, msg, data })
}

module.exports = {
  getCaptcha,
  requestEmailVerify
}
