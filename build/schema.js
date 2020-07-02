const fs = require('fs')
let customSchema = require('../configuration/schema.json')
const systemUserSchema = require('../src/schema/system/User')
const { renderSchema, APP_PATH, createFile, removeFile } = require('./utils')
const collectionNames = Object.keys(customSchema)

const schemaPath = `${APP_PATH}/schema/custom`

function getSchemaFilePath (filename) {
  return `${schemaPath}/${filename}.js`
}

function initUser(collectionNames) {
  const User = 'User'
  if (collectionNames.includes(User)) {
    customSchema[User] = Object.assign({}, customSchema[User], systemUserSchema[User])
  } else {
    customSchema[User] = systemUserSchema[User]
  }
}

function isValidate(obj) {
  return Object.keys(obj).every( v => {
    return /^[a-zA-Z]+$/.test(v)
  })
}

initUser(collectionNames)

// Delete schema dir if schema is {}
if (collectionNames.length === 0) {
  removeFile(schemaPath, () => {
    console.log(`path: ${schemaPath} delete success`)
    createFile(schemaPath)
  })
}

// Create schema files
collectionNames.map((v, i) => {
  // 验证key和value是否合法，只能由字母或下划线组成
  if (!isValidate(customSchema[v])) {
    throw new Error('Column names are illegal and must contain letters or underscores.')
  }
  const item = JSON.stringify(customSchema[v], null , 2).replace(/"/g, "")
  fs.writeFile(getSchemaFilePath(v), renderSchema(v, item), err => {
    if (err) throw err
    console.log(`${i + 1}. ${v}.js create success`)
  })
})
