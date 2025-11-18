const winston = require('winston');
const LokiTransport = require('winston-loki');

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: 'http://localhost:3100',
      labels: { job: 'mi_app' }
    })
  ]
});

logger.info("Hola desde Loki!");
