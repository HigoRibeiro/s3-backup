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
    const databases = configMysql.databases
    
    switch (database) {
      case 'mysql':

        function makeBackup(databaseName) {
          return new Promise((resolve, reject) => {
            getMySQLData(configMysql, databaseName)
            .then((backupFile) => {
              console.log(`Starting upload of backup: ${backupFile.filename}`)
              storage.put(`${databaseName}/${backupFile.filename}`, fs.readFileSync(backupFile.filepath))
              .then(() => {
                console.log(`Backup removed from ${backupFile.filepath}`)
                fs.unlink(backupFile.filepath, function () {})
                let currentIndex = databases.indexOf(databaseName)
                if(databases.indexOf(databaseName) < databases.length-1) {
                  makeBackup(databases[currentIndex+1])
                } else {
                  console.log("Finished backups for now")
                }
                resolve()
              })
              .catch((err) => {
                console.warn(err)
              })
            
            })
            .catch((err) => {
              console.warn(err)
              reject()
            })
          })
        }

        makeBackup(databases[0])
      
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