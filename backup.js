const fs = require('fs')
const StorageManager = require('@slynova/flydrive')
const Sentry = require('@sentry/node')

const getMySQLData = require('./get-mysql-data')

const configStorage = require('./config/storage')
const configSentry = require('./config/sentry')
const configMysql = require('./config/mysql')

Sentry.init(configSentry);

async function backup() {
  try {
    const storage = new StorageManager(configStorage)
    await getMySQLData(configMysql, async (filename, stream) => {
      await storage.put(filename, stream)
    })
  } catch (err) {
    Sentry.captureException(err)
  }
}

module.exports = backup