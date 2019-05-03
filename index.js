const CronJob = require('cron').CronJob
const dotenv = require('dotenv')
dotenv.config()

const backup = require('./backup')

new CronJob('0 0 18 * * *', () => {
  backup()
}, null, true, 'America/Sao_Paulo')