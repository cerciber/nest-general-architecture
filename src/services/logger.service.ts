import { createLogger, format, transports, Logger } from 'winston';
import { Injectable } from '@nestjs/common';
import * as Transport from 'winston-transport';
import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { statics } from '@src/config/statics/statics';

type logLevel = 'INFO' | 'WARN' | 'ERROR';
type LogType = 'SYSTEM' | 'USER';
type LogCateogry = 'INIT' | 'RESPONSE';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = this.buildLogger(this.getTransports());
  }

  private createFileTransport(): Transport {
    return new transports.File({
      maxsize: statics.constants.logs.maxBitsPerFile,
      maxFiles: statics.constants.logs.maxFiles,
      filename: `logs/log.log`,
      // Set format
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.metadata(),
        format.printf((info) => {
          return `[${info.metadata.timestamp}] [${info.level.toUpperCase()}] [${info.metadata.type}:${info.metadata.category}] \n  → ${info.message
            } ${info.metadata.content
              ? `\n  → ${JSON.stringify(info.metadata.content, null, 2).replace(/\n/g, '\n    ')}`
              : ''
            }`;
        }),
      ),
    });
  }

  private createConsoleTransport(): Transport {
    return new transports.Console({
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
          return `\x1b[32m[${info.metadata.timestamp}] ${label} \x1b[36m[${info.metadata.type
            }:${info.metadata.category}] \x1b[37m\n  → ${info.message} ${info.metadata.content
              ? `\n  → ${JSON.stringify(info.metadata.content, null, 2).replace(/\n/g, '\n    ')}`
              : ''
            }`;
        }),
      ),
    });
  }

  private getTransports(): Transport[] {
    const transportList: Transport[] = [];
    if (statics.constants.logs.enableLogs) {
      if (statics.constants.logs.enableConsoleLog) {
        transportList.push(this.createConsoleTransport());
      }
      if (statics.constants.logs.enableFileLog) {
        transportList.push(this.createFileTransport());
      }
    }
    if (transportList.length === 0) {
      transportList.push(
        new transports.Stream({ stream: process.stdout, silent: true }),
      );
    }
    return transportList;
  }

  private buildLogger(transportList: Transport[]): Logger {
    return createLogger({
      transports: transportList,
    });
  }

  public info(
    message: string,
    type: LogType,
    category: LogCateogry,
    content = null,
  ) {
    this.logger.info(message, {
      content,
      type,
      category,
    });
  }

  public warn(
    message: string,
    type: LogType,
    category: LogCateogry,
    content = null,
  ) {
    this.logger.warn(message, {
      content,
      type,
      category,
    });
  }

  public error(
    message: string,
    type: LogType,
    category: LogCateogry,
    content = null,
  ) {
    this.logger.error(message, {
      content,
      type,
      category,
    });
  }

  public logResponse(response: BodyResponseDto | ErrorResponseDto) {
    let level: logLevel;
    if (response.status >= 0 && response.status < 300) {
      level = 'INFO';
    } else if (response.status >= 300 && response.status < 500) {
      level = 'WARN';
    } else {
      level = 'ERROR';
    }
    if (
      statics.constants.logs.logAllUserResponses ||
      (statics.constants.logs.logWarningUserResponses && level === 'WARN') ||
      level === 'ERROR'
    ) {
      switch (level) {
        case 'INFO':
          this.info(response.message, 'USER', 'RESPONSE', response);
          break;
        case 'WARN':
          this.warn(response.message, 'USER', 'RESPONSE', response);
          break;
        case 'ERROR':
          this.error(response.message, 'USER', 'RESPONSE', response);
          break;
      }
    }
    if (level === 'WARN') {
      if (statics.constants.request.responseWarningsWithError) {
        if (
          !statics.constants.request.responseWithErrorStack &&
          'error' in response
        ) {
          if (statics.constants.request.responseWithError && 'error' in response) {
            delete (response as ErrorResponseDto).error.stack;
          } else {
            delete (response as ErrorResponseDto).error;
          }
        }
      } else {
        delete (response as ErrorResponseDto).error;
      }
    } else if (level === 'ERROR') {
      if (
        !statics.constants.request.responseWithErrorStack &&
        'error' in response
      ) {
        if (statics.constants.request.responseWithError && 'error' in response) {
          delete (response as ErrorResponseDto).error.stack;
        } else {
          delete (response as ErrorResponseDto).error;
        }
      }
    }
  }
}