'use strict'

/**
 * node-flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

module.exports = {
  default: 's3',
  disks: {
    s3: {
      driver: 's3',
      key: process.env.AWS_S3_KEY,
      secret: process.env.AWS_S3_SECRET,
      region: process.env.AWS_S3_REGION,
      bucket: process.env.AWS_S3_BUCKET
    },
  },
}