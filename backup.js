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
        await getMySQLData(configMysql, async (filename, stream) => {
          await storage.put(`${configStorage.fileFolder}/${filename}`, stream)
        })
      break
      case 'pg':
        await getPostgreSQLData(configPgsql, async (filename, stream) => {
          await storage.put(filename, stream)
        })
      break
    }
  } catch (err) {
    Sentry.captureException(err)
  }
}

module.exports = backup