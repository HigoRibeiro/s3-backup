/**
 * Main config
 */
module.exports = {
  debug: true,
  cron_time: "0 5 * * 0",
  sentry_dsn: "",
  timezone: "America/Sao_Paulo",
  s3Default: {
    key: "",
    secret: "",
    region: "us-east-1",
    bucket: ""
  },
  instances: [
    {
      engine: "mysql",
      isDocker: false,
      host: "127.0.0.1",
      user: "root",
      port: "3306",
      password: "",
      databases: [""]
    },
    {
      engine: "pg",
      isDocker: true,
      dockerImage: "",
      user: "",
      databases: [""]
    }
  ]
}