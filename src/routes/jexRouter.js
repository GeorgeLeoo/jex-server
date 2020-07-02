const express = require('express')
const JexRouter = express.Router()
const jexController = require('./../controller/jexController')

JexRouter.post('/get/:collectionName', async function (req, res) {
  await jexController.getJex({ req, res })
})

JexRouter.post('/get/count/:collectionName', async function (req, res) {
  await jexController.getCount({ req, res })
})

JexRouter.post('/post/:collectionName', async function (req, res) {
  await jexController.updateAndInsertJex({ req, res })
})

JexRouter.post('/delete/:collectionName', async function (req, res) {
  await jexController.removeJex({ req, res })
})

JexRouter.post('/increment/:collectionName', async function (req, res) {
  await jexController.incrementJex({ req, res })
})

module.exports = JexRouter
