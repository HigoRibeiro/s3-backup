module.exports = {
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_NAME,
  server: process.env.PG_SERVER || 'localhost',
  port: process.env.PG_PORT || 5432
}