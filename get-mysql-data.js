const exec = require('child_process').exec;
const moment = require('moment')
const fs = require('fs')

module.exports = async (config, databaseName, file) => new Promise(async (resolve, reject) => {
  try {

    const now = moment().format('YYYY-MM-DD-HH-m')
    const filename = `${databaseName}-${now}.sql`
    const filepath = `${__dirname}/${filename}`

    exec(`mysqldump -h${config.host} -P${config.port} -u${config.username} -p${config.password} ${databaseName} > ${filepath}`)

    let interval = setInterval(() => {
      if (fs.existsSync(filepath)) {
        file(filename, fs.readFileSync(filepath), filepath)
        resolve()
        clearInterval(interval)
      }
    }, 2000)

  } catch (err) {
    reject(err)
  }
})