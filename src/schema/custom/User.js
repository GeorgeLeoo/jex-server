// Auto build by build/index.js
  
const db = require('../../db/conn')
const Schema = db.Schema
const JexSchema = new Schema({
  age: {
    type: Number
  },
  gender: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})
module.exports = db.model('Users', JexSchema)
