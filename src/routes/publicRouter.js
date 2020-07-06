const express = require('express')
const JexPublicRouter = express.Router()
const JexPublicController = require('./../controller/publicController')

JexPublicRouter.post('/captcha', function (req, res) {
  JexPublicController.getCaptcha({ req, res })
})

module.exports = JexPublicRouter
