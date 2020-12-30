module.exports = {
  dockerImage: process.env.PG_DOCKER_IMAGE,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  databases: JSON.parse(process.env.PG_DATABASES),
  server: process.env.PG_SERVER || 'localhost',
  port: process.env.PG_PORT || 5432
}