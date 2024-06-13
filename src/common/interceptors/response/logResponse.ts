import { BodyResponseDto } from '@src/dto/bodyResponse.dto';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { config } from '@src/config/config';
import Logger from '@src/entities/logger';

export function logResponse(response: BodyResponseDto | ErrorResponseDto) {
  let level: 'info' | 'warn' | 'error';
  if (response.status >= 0 && response.status < 300) {
    level = 'info';
  } else if (response.status >= 300 && response.status < 500) {
    level = 'warn';
  } else if (response.status >= 500) {
    level = 'error';
  }
  if (
    config.constants.logs.logAllUserResponses ||
    (config.constants.logs.logWarningUserResponses && level === 'warn') ||
    level === 'error'
  ) {
    Logger[level](response.message, Logger.types.USER, 'RESPONSE', response);
  }
  if (level === 'warn') {
    if (config.constants.request.responseWarningsWithError) {
      if (
        !config.constants.request.responseWithErrorStack &&
        'error' in response
      ) {
        if (config.constants.request.responseWithError && 'error' in response) {
          delete (response as ErrorResponseDto).error.stack;
        } else {
          delete (response as ErrorResponseDto).error;
        }
      }
    } else {
      delete (response as ErrorResponseDto).error;
    }
  } else if (level === 'error') {
    if (
      !config.constants.request.responseWithErrorStack &&
      'error' in response
    ) {
      if (config.constants.request.responseWithError && 'error' in response) {
        delete (response as ErrorResponseDto).error.stack;
      } else {
        delete (response as ErrorResponseDto).error;
      }
    }
  }
}
