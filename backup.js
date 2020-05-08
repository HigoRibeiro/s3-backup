const fs = require('fs')
const StorageManager = require('@slynova/flydrive')
const Sentry = require('@sentry/node')

const getMySQLData = require('./get-mysql-data')
const getPostgreSQLData = require('./get-pgsql-data')

const configStorage = require('./config/storage')
const configSentry = require('./config/sentry')
const configMysql = require('./config/mysql')
const configPgsql = require('./config/pgsql')

const database = process.env.DATABASE || 'mysql'

Sentry.init(configSentry);

async function backup() {
  try {
    const storage = new StorageManager(configStorage)
    switch (database) {
      case 'mysql':
        await configMysql.databases.map( async (databaseName) => {
          await getMySQLData(configMysql, databaseName, async (filename, filecontent, filepath) => {
            await storage.put(`${databaseName}/${filename}`, filecontent)
            .then(() => {
              fs.unlink(filepath, function () {});
            })
          })
        })
      break
      case 'pg':
        await configMysql.databases.map( async (databaseName) => {
          await getPostgreSQLData(configPgsql, databaseName, async (filename, stream) => {
            await storage.put(`${databaseName}/${filename}`, stream)
          })
        })
      break
    }
  } catch (err) {
    Sentry.captureException(err)
  }
}

module.exports = backup