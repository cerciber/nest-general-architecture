import { createLogger, Logger } from 'winston';
import { Injectable } from '@nestjs/common';
import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { getTransports } from './logger-service/get-transports';
import { LogLevel, logResponse } from './logger-service/log-response';

type LogType = 'SYSTEM' | 'USER';
type LogCateogry = 'INIT' | 'RESPONSE';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      transports: getTransports(),
    });
  }

  public info(
    message: string,
    type: LogType,
    category: LogCateogry,
    content?: BodyResponseDto | ErrorResponseDto,
  ): void {
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
    content?: BodyResponseDto | ErrorResponseDto,
  ): void {
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
    content?: BodyResponseDto | ErrorResponseDto,
  ): void {
    this.logger.error(message, {
      content,
      type,
      category,
    });
  }

  public logResponse(response: BodyResponseDto | ErrorResponseDto): LogLevel {
    return logResponse(this, response);
  }
}
