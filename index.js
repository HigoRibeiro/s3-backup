const dotenv = require('dotenv')

const fs = require('fs')
const StorageManager = require('@slynova/flydrive')
const Sentry = require('@sentry/node')

const generateMysql = require('./generate-mysql')
const now = require('./now')

dotenv.config()

const configStorage = require('./config/storage')
const configSentry = require('./config/sentry')
const configMysql = require('./config/mysql')

Sentry.init(configSentry);

function main() {
  try {
    const storage = new StorageManager(configStorage)
    const filename = await generateMysql(configMysql, async (stream) => {
      await storage.put(filename, stream)
    })
  } catch (err) {
    Sentry.captureException(err)
  }
}

main()