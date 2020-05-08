const execa = require('execa')
const moment = require('moment')

module.exports = async (config, databaseName, file) => new Promise(async (resolve, reject) => {
  try {

    execa('pg_dump', 
      ['--dbname', `postgresql://${config.username}:${config.password}@${config.server}:${config.port}/${databaseName}`])
      .then(res => {
        const now = moment().format('YYYY-MM-DD-HH-mm-ss')
        const filename = `${databaseName}-${now}.postgresql.sql`
        file(filename, res.stdout)
        resolve()
      })
  } catch (err) {
    reject(err)
  }
})