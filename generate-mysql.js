const execa = require('execa')

const now = require('./now')

module.exports = async (config, file) => new Promise(async (resolve, reject) => {
  try {
    const filename = `${now}.sql`
    //const command = `mysqldump -h ${config.server} -P ${config.port} -u ${config.username} -p${config.password} ${config.database} > ${filename}`
    //await execa.shell(command)
    execa('mysqldump', ['-h', config.server, '-P', config.port, '-u', config.username, `-p${config.password}`, config.database]).then(res => {
      file(res.stdout)
      resolve()
    })
  } catch (err) {
    reject(err)
  }
})