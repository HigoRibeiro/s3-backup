const exec = require('child_process').exec;
const moment = require('moment')
const fs = require('fs')

module.exports = (config, databaseName) => new Promise( (resolve, reject) => {
  try {

    const now = moment().format('YYYY-MM-DD-HH-m')
    const filename = `${databaseName}-${now}.sql`
    const filepath = `${__dirname}/dumps/${filename}`
    const cmd = `mysqldump -h${config.host} -P${config.port} -u${config.username} -p${config.password} ${databaseName} > ${filepath}`
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }

      console.log(`Backup created: ${filename}`)
      
      const backupFile = {
        filename: filename,  
        filepath: filepath
      }
      resolve(backupFile)
    })

  } catch (err) {
    reject(err)
  }
})