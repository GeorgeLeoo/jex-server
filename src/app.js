const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const jexRouter = require('./routes/jexRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jex', jexRouter);
app.use('/jex/user', userRouter);

module.exports = app;
