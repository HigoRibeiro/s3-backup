const makeBackup = require('./src/makeBackup')

module.exports = ( async () => {
  makeBackup()
    .then(() => {
      console.log('Backup successfully generated!')
    })
})()
