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

Sentry.init(configSentry)

async function read(path, file) {
  return new Promise(resolve => {
    const stream = fs.createReadStream(path, { encoding: 'utf8' })

    stream.on('data', async stream => {
      try {
        await file(stream)
      } catch (err) {
        Sentry.captureException(err)
      }
    })

    stream.on('close', () => {
      resolve()
    })
  })
}

(async function () {
  try {
    const storage = new StorageManager(configStorage)
    const filename = await generateMysql(configMysql)
    await read(filename, async (stream) => {
      await storage.put(filename, stream)
    })

  } catch (err) {
    Sentry.captureException(err)
  }

  fs.unlinkSync(`${now}.sql`)
})()