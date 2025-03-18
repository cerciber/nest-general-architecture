import { statics } from '@src/common/statics/statics';
import { format, transports } from 'winston';
import * as Transport from 'winston-transport';
import { TransformableInfo } from 'logform';

interface LogInfo extends TransformableInfo {
  metadata?: {
    timestamp: string;
    type: string;
    category: string;
    content?: any;
  };
}

function createFileTransport(): Transport {
  return new transports.File({
    maxsize: statics.constants.logs.maxBitsPerFile,
    maxFiles: statics.constants.logs.maxFiles,
    filename: `logs/log.log`,
    // Set format
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.metadata(),
      format.printf((info: LogInfo) => {
        if (!info.metadata) {
          return `[NO_METADATA] ${info.level.toUpperCase()} ${info.message}`;
        }
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
}

function createConsoleTransport(): Transport {
  return new transports.Console({
    // Set format
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.metadata(),
      format.printf((info: LogInfo) => {
        if (!info.metadata) {
          return `[NO_METADATA] ${info.level.toUpperCase()} ${info.message}`;
        }
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
}

export function getTransports(): Transport[] {
  const transportList: Transport[] = [];
  if (statics.constants.logs.enableLogs) {
    if (statics.constants.logs.enableConsoleLog) {
      transportList.push(createConsoleTransport());
    }
    if (statics.constants.logs.enableFileLog) {
      transportList.push(createFileTransport());
    }
  }
  if (transportList.length === 0) {
    transportList.push(
      new transports.Stream({ stream: process.stdout, silent: true }),
    );
  }
  return transportList;
}
