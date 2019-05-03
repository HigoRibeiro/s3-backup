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

async function main() {
  try {
    const storage = new StorageManager(configStorage)
    await generateMysql(configMysql, async (filename, stream) => {
      await storage.put(filename, stream)
    })
  } catch (err) {
    Sentry.captureException(err)
  }
}

main()