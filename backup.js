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

const dbEngines = JSON.parse(process.env.DB_ENGINES) || []

Sentry.init(configSentry);

const getDbEngineInfo = (dbEngine) => {

  if(dbEngine == 'mysql') return { getData: getMySQLData, config: configMysql }
  
  return { getData: getPostgreSQLData, config: configPgsql }

}

async function backup() {
  try {

    const storage = new StorageManager(configStorage)
    
    for(const dbEngine of dbEngines) {
      if(process.env.DEBUG === 'true') console.log(`******** STARTING BACKUP FOR ENGINE ${dbEngine} ************`)

      const { getData, config } = getDbEngineInfo(dbEngine)

      for(const databaseName of config.databases) {
        if(process.env.DEBUG === 'true') console.log(`******** STARTING BACKUP FOR DB ${databaseName} ************`)
        const backupFile = await getData(config, databaseName)
        if(process.env.DEBUG === 'true') console.log(`Starting upload of backup: ${backupFile.filename}`)
        await storage.put(`${databaseName}/${backupFile.filename}`, fs.readFileSync(backupFile.filepath))
        fs.unlink(backupFile.filepath, function () {})
        if(process.env.DEBUG === 'true') console.log(`Backup removed from ${backupFile.filepath}`)
        if(process.env.DEBUG === 'true') console.log(`******** FINISHED BACKUP FOR DB ${databaseName} ************`)
      }
  
      Sentry.captureMessage(`Backup successfully databases: ${JSON.stringify(config.databases)}`);
    }

  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
  }
}

module.exports = backup