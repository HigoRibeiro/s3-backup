const execa = require('execa')
const moment = require('moment')

module.exports = async (config, file) => new Promise(async (resolve, reject) => {
  try {

    execa('mysqldump', ['-h', config.host, '-P', config.port, '-u', config.username, `-p${config.password}`, config.database]).then(res => {
      const now = moment().format('YYYY-MM-DD-HH-m')
      const filename = `${config.database}-${now}.sql`
      file(filename, res.stdout)
      resolve()
    })
  } catch (err) {
    reject(err)
  }
})