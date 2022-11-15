const config = require('./config')
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: "app",
  src: true,
  level: config.server.loggingLevel,
  serializers: bunyan.stdSerializers
})

logger.info('Logger created, level: %s', logger.level())

module.exports = logger