const path = require('path')
const exec = require('child_process').exec

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

exports.renderSchema = function (collectionName, db) {
  return `// Auto build by build/index.js
  
const db = require('../../db/conn')
const Schema = db.Schema
const JexSchema = new Schema(${db})
module.exports = db.model('${collectionName}s', JexSchema)
`
}

exports.removeFile = function(path, success, fail) {
  exec('rm -r ' + path, function (err, stdout, stderr) {
    if (err) {
      typeof fail === 'function' && fail()
      throw err
    }
    typeof success === 'function' && success()
  });
}

exports.createFile = function(path, success, fail) {
  exec('mkdir ' + path, function (err, stdout, stderr) {
    if (err) {
      typeof fail === 'function' && fail()
      throw err
    }
    typeof success === 'function' && success()
  });
}

exports.hasFile = function(path) {
  return new Promise(resolve => {
    fs.access(path, err => {
      if (err) {
        createFile(path)
        resolve(true)
      }
      resolve(true)
    })
  })
}

exports.APP_PATH = exports.resolve('src')
exports.DIST_PATH = exports.resolve('dist')
