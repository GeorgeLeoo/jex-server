const Response = require('../utils/Response')
const svgCaptcha = require('svg-captcha')
const { setValue } = require('../utils/redis')
const { captchaOptions } = require('../config')

async function getCaptcha ({ req, res }) {
  const { uuid } = req.query
  const captcha = svgCaptcha.create(captchaOptions)
  setValue(uuid, captcha.text.toLowerCase(), 43200)
  const response = new Response({ res })
  response.send({ data: captcha.data})
}

module.exports = {
  getCaptcha
}
