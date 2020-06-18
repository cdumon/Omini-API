const { addColors, createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const { combine } = format;
const fs = require('fs');
const path = require('path');

const levels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        azure: 3,
        db: 4,
        transcription: 5,
        all: 6
    },
    colors: {
        info: 'green',
        warn: 'yellow',
        error: 'red',
        azure: 'blue',
        db: 'magenta',
        transcription: 'cyan'
    }
};

addColors(levels.colors);

const infoFilter = format((info, opts) => {
    return info.level === 'info' ? info : false
})

const errorAndWarnFilter = format((info, opts) => {
    return info.level === 'error' || info.level === 'warn' ? info : false
})

const azureFilter = format((info, opts) => {
    return info.level === 'azure' ? info : false
})

const transcriptionFilter = format((info, opts) => {
    return info.level === 'transcription' ? info : false
})

const dbFilter = format((info, opts) => {
    return info.level === 'db' ? info : false
})

const customTransports = [
    new (transports.DailyRotateFile)({
        name: 'Error & Warning Logs',
        filename: `${appRoot}/logs/error/error-%DATE%.log`,
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '128m',
        maxFiles: '365d',
        level: 'warn',
        json: true,
        colorize: false,
        format: errorAndWarnFilter()
    }),
    new (transports.DailyRotateFile)({
        name: 'Info logs',
        filename: `${appRoot}/logs/info/info-%DATE%.log`,
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '128m',
        maxFiles: '365d',
        json: true,
        colorize: false,
        level: 'info',
        format: infoFilter()
    }),
    new (transports.DailyRotateFile)({
        name: 'Azure logs',
        filename: `${appRoot}/logs/azure/azure-%DATE%.log`,
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '128m',
        maxFiles: '365d',
        json: true,
        colorize: false,
        level: 'azure',
        format: azureFilter()
    }),
    new (transports.DailyRotateFile)({
        name: 'Transcription logs',
        filename: `${appRoot}/logs/transcriptions/transcriptions-%DATE%.log`,
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '128m',
        maxFiles: '365d',
        json: true,
        colorize: false,
        level: 'transcription',
        format: transcriptionFilter()
    }),
    new (transports.DailyRotateFile)({
        name: 'Database logs',
        filename: `${appRoot}/logs/db/db-%DATE%.log`,
        datePattern: 'DD-MM-YYYY',
        zippedArchive: true,
        maxSize: '128m',
        maxFiles: '365d',
        json: true,
        colorize: false,
        level: 'db',
        format: dbFilter()
    })
]

const logger = module.exports =  createLogger({
    level: 'all',
    levels: levels.levels,
    format: combine(
        format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: combine(
                format.colorize({ all: true }),
                format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
        ...customTransports,
    ],
});

// TEST
/*
logger.info('info');
logger.warn('warn');
logger.azure('azure');
logger.error('error');
logger.transcription('transcription');
logger.db('db');
*/