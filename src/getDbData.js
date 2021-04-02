const getMySQLData = require('./getMysqlData');
const getPostgreSQLData = require('./getPgData');


module.exports = (dbInstance) => {
  if(dbInstance.engine == 'mysql') return { getData: getMySQLData }
  return { getData: getPostgreSQLData }
}