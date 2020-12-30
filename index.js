const CronJob = require('cron').CronJob
const dotenv = require('dotenv')
dotenv.config()

const backup = require('./backup')

module.exports = ( async () => {

  new CronJob(process.env.CRON_TIME || '* * * * * *', async () => {
    await backup()
  }, null, true, process.env.TIMEZONE)

})()