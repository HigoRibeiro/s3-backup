const execa = require('execa')
const crypto = require('crypto')

const now = require('./now')

module.exports = async (config, file) => new Promise(async (resolve, reject) => {
  try {

    execa('mysqldump', ['-h', config.server, '-P', config.port, '-u', config.username, `-p${config.password}`, config.database]).then(res => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) reject(err)

        const filename = `${hash.toString("hex")}-${now}.sql`
        file(filename, res.stdout)
        resolve()
      })
    })
  } catch (err) {
    reject(err)
  }
})