import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { statics } from '@src/common/statics/statics';
import { LoggerService } from '../logger.service';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function getLogLevel(statusCode: number): LogLevel {
  if (statusCode >= 0 && statusCode < 300) {
    return 'INFO';
  } else if (statusCode >= 300 && statusCode < 500) {
    return 'WARN';
  } else {
    return 'ERROR';
  }
}

export function logResponse(
  loggerService: LoggerService,
  response: BodyResponseDto | ErrorResponseDto,
): LogLevel {
  const logLevel: LogLevel = getLogLevel(response.status);
  switch (logLevel) {
    case 'INFO':
      if (statics.constants.logs.logResponses.info) {
        loggerService.info(response.code, 'USER', 'RESPONSE', response);
      }
      break;
    case 'WARN':
      if (statics.constants.logs.logResponses.warn) {
        loggerService.warn(response.code, 'USER', 'RESPONSE', response);
      }
      break;
    case 'ERROR':
      if (statics.constants.logs.logResponses.error) {
        loggerService.error(response.code, 'USER', 'RESPONSE', response);
      }
      break;
  }
  return logLevel;
}
