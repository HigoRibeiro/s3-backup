const CronJob = require('cron').CronJob
const dotenv = require('dotenv')
dotenv.config()

const backup = require('./backup')

new CronJob(process.env.CRON_TIME || '* * * * * *', () => {
  backup()
}, null, true, 'America/Sao_Paulo')