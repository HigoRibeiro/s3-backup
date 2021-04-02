const config = require('../config')
module.exports = (dbInstance) => {

  let storageConfig
  if(!dbInstance.s3) {
    storageConfig = config.s3Default
  } else {
    storageConfig = dbInstance.s3
  }

  return {
    default: 's3',
    disks: {
      s3: {
        driver: 's3',
        key: storageConfig.key,
        secret: storageConfig.secret,
        region: storageConfig.region,
        bucket: storageConfig.bucket
      },
    },
  }
}