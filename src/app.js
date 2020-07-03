const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const jexRouter = require('./routes/jexRouter')
const userRouter = require('./routes/userRouter')
const ResponseCode = require('./utils/ResponseCode')
const Response = require('./utils/Response')
const { whiteList } = require('./config')

const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

function hasToken ({ token, req, res, next }) {
  const response = new Response({ req, res })
  utils.checkToken(token).then(async data => {
      req.data = data
      next()
    })
    .catch(err => {
      response.send({ code: ResponseCode.UN_AUTHORIZATION, msg: 'Token is invalid.' })
    })
}

app.use(function (req, res, next) {
  if (whiteList.indexOf(req.params.collectionName) > -1) {
    next()
  } else {
    const token = req.headers['jex-token']
    if (!token) {
      const response = new Response({ req, res })
      response.send({ code: ResponseCode.UN_AUTHORIZATION, msg: 'Token is invalid.' })
    } else {
      hasToken({ token, req, res, next })
    }
  }
})

app.use('/jex', jexRouter)
app.use('/jex/user', userRouter)

module.exports = app
