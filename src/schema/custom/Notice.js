// Auto build by build/index.js
  
const db = require('../../db/conn')
const Schema = db.Schema
const JexSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
})
module.exports = db.model('Notices', JexSchema)
