const svgCaptcha = require('svg-captcha')
const { setValue } = require('../utils/redis')
const { captchaOptions } = require('../config')
const Response = require('../utils/Response')
const email = require('./../email')

async function getCaptcha ({ req, res }) {
  const { uuid } = req.body
  const captcha = svgCaptcha.create(captchaOptions)
  setValue(uuid, captcha.text.toLowerCase(), 43200)
  const response = new Response({ res })
  response.send({ data: captcha.data})
}
async function requestEmailVerify({req, res}) {
  const { mail } = req.body
  email.sendMail(mail, function(error, info){
    if(error) {
      return console.log(error);
    }
    console.log('mail sent:', info.response);
  });
}

module.exports = {
  getCaptcha,
  requestEmailVerify
}
