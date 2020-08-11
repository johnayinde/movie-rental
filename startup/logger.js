// const { transports, createLogger, format, error } = require('winston');
const winston = require('winston')
require('express-async-errors');
require('winston-mongodb');


module.exports = function () {

   winston.add(new winston.transports.File({
      filename: 'logfile.log',
      handleExceptions: true,
      handleRejections: true,
   }));

   winston.add(new winston.transports.MongoDB({
      db: process.env.DB,
      level: 'info',
      options: { useUnifiedTopology: true }
   }));


   /**Alternative for Rejection and Exception */
   winston.exceptions.handle(
      new winston.transports.File({
         filename: 'exception.log',

      }),
      new winston.transports.Console({
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.prettyPrint()
         )
      }))
   // winston.rejections.handle(new winston.transports.File({
   //    filename: 'rejection.log',
   // }))
}
