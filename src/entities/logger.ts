import { constants } from '@src/config/constants/constants';
import { createLogger, format, transports, Logger } from 'winston';

// By files
const fileTransport = new transports.File({
  maxsize: constants.logs.maxBitsPerFile,
  maxFiles: constants.logs.maxFiles,
  filename: `logs/log.log`,
  // Set format
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata(),
    format.printf((info) => {
      return `[${info.metadata.timestamp}] [${info.level.toUpperCase()}] [${info.metadata.type}:${info.metadata.category}] \n  → ${
        info.message
      } ${
        info.metadata.content
          ? `\n  → ${JSON.stringify(info.metadata.content, null, 2).replace(/\n/g, '\n    ')}`
          : ''
      }`;
    }),
  ),
});

// By console
const consoleTransport = new transports.Console({
  // Set format
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata(),
    format.printf((info) => {
      let label = info.level.toUpperCase();
      // Set colors
      switch (info.level.toUpperCase()) {
        case 'INFO':
          label = `\x1b[37m[${label}]`;
          break;
        case 'WARN':
          label = `\x1b[33m[${label}]`;
          break;
        case 'ERROR':
          label = `\x1b[31m[${label}]`;
          break;
        default:
      }
      return `\x1b[32m[${info.metadata.timestamp}] ${label} \x1b[36m[${
        info.metadata.type
      }:${info.metadata.category}] \x1b[37m\n  → ${info.message} ${
        info.metadata.content
          ? `\n  → ${JSON.stringify(info.metadata.content, null, 2).replace(/\n/g, '\n    ')}`
          : ''
      }`;
    }),
  ),
});

// Asign store mechanisms
const transportList = [];
if (constants.logs.enableLogs) {
  if (constants.logs.enableConsoleLog) {
    transportList.push(consoleTransport);
  }
  if (constants.logs.enableFileLog) {
    transportList.push(fileTransport);
  }
}
if (transportList.length === 0) {
  transportList.push(
    new transports.Stream({ stream: process.stdout, silent: true }),
  );
}

// Create logger
const logger: Logger = createLogger({
  // Asign store mechanisms
  transports: transportList,
});

// Types
const types = {
  SYSTEM: 'SYSTEM',
  USER: 'USER',
};

// Info
function info(
  message: string,
  type = types.SYSTEM,
  category = 'default',
  content = null,
) {
  logger.info(message, {
    content,
    type,
    category,
  });
}

// Warning
function warn(
  message: string,
  type = types.SYSTEM,
  category = 'default',
  content = null,
) {
  logger.warn(message, {
    content,
    type,
    category,
  });
}

// Error
function error(
  message: string,
  type = types.SYSTEM,
  category = 'default',
  content = null,
) {
  logger.error(message, {
    content,
    type,
    category,
  });
}

// Export logger functions
export default { info, warn, error, types };
