const fs = require('fs')
const StorageManager = require('@slynova/flydrive')
const Sentry = require('@sentry/node')

const dotenv = require('dotenv')
dotenv.config()

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

        for(databaseName of configMysql.databases) {
          if(process.env.DEBUG === 'true') console.log(`******** STARTING BACKUP FOR DB ${databaseName} ************`)
          const backupFile = await getMySQLData(configMysql, databaseName)
          if(process.env.DEBUG === 'true') console.log(`Starting upload of backup: ${backupFile.filename}`)
          await storage.put(`${databaseName}/${backupFile.filename}`, fs.readFileSync(backupFile.filepath))
          fs.unlink(backupFile.filepath, function () {})
          if(process.env.DEBUG === 'true') console.log(`Backup removed from ${backupFile.filepath}`)
          if(process.env.DEBUG === 'true') console.log(`******** FINISHED BACKUP FOR DB ${databaseName} ************`)
        }

        Sentry.captureMessage(`Backup successfully databases: ${JSON.stringify(configMysql.databases)}`);
      
      break
      case 'pg':

      for(databaseName of configPgsql.databases) {
        await getPostgreSQLData(configPgsql, databaseName, async (filename, stream) => {
          await storage.put(`${databaseName}/${filename}`, stream)
        })
      }
      break
    }
  } catch (err) {
    Sentry.captureException(err)
  }
}

module.exports = backup