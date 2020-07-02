module.exports = {
  getDB_URL: function ({ ip, port, username, password, dbName, authSource }) {
    if (!ip || !port) {
      throw 'The ip and port must be required.'
    }
    if (!dbName) {
      throw 'The dbName must be required.'
    }
    if (!username && !password && !authSource) {
      console.warn('The database is best logged in using authentication.')
      return `mongodb://${ip}:${port}/${dbName}`
    } else {
      return `mongodb://${username}:${password}@${ip}:${port}/${dbName}?authSource=${authSource}`
    }
  },
  getDB(collectionName) {
    return require(`./../../schema/custom/${collectionName}.js`)
  }
}
