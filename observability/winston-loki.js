const winston = require('winston');
const LokiTransport = require('winston-loki');

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: 'http://loki:3100',
      labels: { job: 'observability-service' },
      json: true
    })
  ]
});

logger.info("Hola desde Loki!");
module.exports = logger;
