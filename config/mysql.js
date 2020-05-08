module.exports = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  databases: JSON.parse(process.env.MYSQL_DATABASES),
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306
}