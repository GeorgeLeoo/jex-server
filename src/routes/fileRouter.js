const express = require('express')
const FileRouter = express.Router()
const FileController = require('./../controller/fileController')

FileRouter.post('/', function (req, res) {
  FileController.uploadFile({ req, res })
})

module.exports = FileRouter
