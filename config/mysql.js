module.exports = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_NAME,
  server: process.env.MYSQL_SERVER || 'localhost',
  port: process.env.MYSQL_PORT || 3306
}