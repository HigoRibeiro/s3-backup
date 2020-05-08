const exec = require('child_process').exec;
const moment = require('moment')
const fs = require('fs')

module.exports = async (config, file) => new Promise(async (resolve, reject) => {
  try {

    
    const now = moment().format('YYYY-MM-DD-HH-m')
    const filename = `${config.database}-${now}.sql`
    const filepath = `${__dirname}/${filename}`

    exec(`mysqldump -h${config.host} -P${config.port} -u${config.username} -p${config.password} ${config.database} > ${filepath}`)

    let interval = setInterval(() => {
      if (fs.existsSync(filepath)) {
        file(filename, fs.readFileSync(filepath))
        resolve()
        clearInterval(interval)
      }
    }, 5000)

  } catch (err) {
    reject(err)
  }
})