const fs = require('fs')
const StorageManager = require('@slynova/flydrive')
const Sentry = require('@sentry/node')
const config = require('../config')
const getDbData = require('./getDbData')
const getStorageManager = require('./getStorageManager')

module.exports = async () => {
  try {

    for(const dbInstance of config.instances) {
      if(config.debug) console.log(`******** STARTING BACKUP FOR ENGINE ${dbInstance.engine} ************`)
      
      const { getData } = getDbData(dbInstance)

      const storage = new StorageManager(getStorageManager(dbInstance))

      for(const databaseName of dbInstance.databases) {

        if(config.debug) console.log(`******** STARTING BACKUP FOR DB ${databaseName} ************`)
        const backupFile = await getData(dbInstance, databaseName)

        if(config.debug) console.log(`Starting upload of backup: ${backupFile.filename}`)
        await storage.put(`${databaseName}/${backupFile.filename}`, fs.readFileSync(backupFile.filepath))

        fs.unlink(backupFile.filepath, function () {})
        if(config.debug) console.log(`Backup removed from ${backupFile.filepath}`)
        if(config.debug) console.log(`******** FINISHED BACKUP FOR DB ${databaseName} ************`)
        
      }
  
      Sentry.captureMessage(`Backup successfully databases: ${JSON.stringify(config.databases)}`);
    }

  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
  }
}