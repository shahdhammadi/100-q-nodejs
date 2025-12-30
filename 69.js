const winston = require('winston');
const { combine, timestamp, json } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d'
        })
    ]
});

// استخدام اللوغر
logger.info('رسالة معلومات');
logger.error('رسالة خطأ');