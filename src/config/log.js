const winston = require('winston')
    , logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.simple()
                , colorize: true
                , level: 'info'
            })
        ]
    });

module.exports = logger;