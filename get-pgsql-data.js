const exec = require('child_process').exec;
const moment = require('moment');

module.exports = (config, databaseName) => new Promise( (resolve, reject) => {
  try {

    const now = moment().format('YYYY-MM-DD-HH-m')
    const filename = `${databaseName}-${now}.sql`
    const filepath = `${__dirname}/dumps/${filename}`
    const cmd = `docker exec ${config.dockerImage} pg_dump -U ${config.username} ${databaseName} > ${filepath}`
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }

      if(process.env.DEBUG === 'true') console.log(`Backup created: ${filename}`)
      
      resolve({ filename: filename, filepath: filepath })
    })

  } catch (err) {
    reject(err)
  }
})