const svgCaptcha = require('svg-captcha')
const { setValue, getValue } = require('../utils/redis')
const { captchaOptions } = require('../config')
const Response = require('../utils/Response')
const emailServer = require('./../email')
const passwordRestTemplate = require('../template/passwordRestTemplate')
const verifyCodeEmailTemplate = require('../template/verifyCodeEmailTemplate')

async function getCaptcha ({ req, res }) {
  const { uuid } = req.body
  const captcha = svgCaptcha.create(captchaOptions)
  setValue(uuid, captcha.text.toLowerCase(), 43200)
  const response = new Response({ res })
  response.send({ data: captcha.data })
}

async function requestPasswordReset ({ req, res }) {
  // const { email } = req.body
  const email = "georgeleeo@163.com"
  const sendInfo = {
    to: email,
    code: '2339',
    expire: '2020-10-02 10:22:34',
    user: email
  }
  const emailData = passwordRestTemplate(sendInfo)
  const { code, msg, data } = await emailServer.send(emailData)
  const response = new Response({ res })
  response.send({ code, msg, data })
}

async function requestEmailCaptcha ({ req, res }) {
  const { uuid, email } = req.body
  console.log(email);
  
  // const email = "georgeleeo@163.com"
  const captcha = svgCaptcha.create(captchaOptions)
  const captchaData = captcha.text
  // setValue(uuid, captcha.text.toLowerCase(), 43200)
  // 存到数据库
  const sendInfo = {
    to: email,
    code: captchaData,
    expire: '2020-10-02 10:22:34',
    user: email
  }
  const emailData = verifyCodeEmailTemplate(sendInfo)
  const { code, msg, data } = await emailServer.send(emailData)
  const response = new Response({ res })
  response.send({ code, msg, data })
}

async function requestPasswordResetVerify({req, res}) {
  // const response = new Response({ res })
  // response.send({ code, msg, data })
}

async function requestEmailCaptchaVerify({req, res}) {
  // const response = new Response({ res })
  // response.send({ code, msg, data })
}

async function verifyCaptcha({req, res}) {
  const response = new Response({ res })
  const { uuid, captcha } = req.body
  const data = await getValue(uuid)
  if (data === captcha) {
    response.send({ msg: 'ok' })
  } else {
    response.send({ msg: 'no' })
  }
}

module.exports = {
  getCaptcha,
  requestPasswordReset,
  requestEmailCaptcha,
  requestPasswordResetVerify,
  requestEmailCaptchaVerify,
  verifyCaptcha
}
