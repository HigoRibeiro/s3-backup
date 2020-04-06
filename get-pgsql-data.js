const execa = require('execa')
const crypto = require('crypto')
const moment = require('moment')

module.exports = async (config, file) => new Promise(async (resolve, reject) => {
  try {

    execa('pg_dump', 
      ['--dbname', `postgresql://${config.username}:${config.password}:${config.port}@${config.server}/${config.database}`]).then(res => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) reject(err)

        const now = moment().format('YYYY-MM-DD-HH:m')
        const filename = `${hash.toString("hex")}-${now}.postgresql.sql`
        file(filename, res.stdout)
        resolve()
      })
    })
  } catch (err) {
    reject(err)
  }
})