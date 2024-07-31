import { BadRequestException, HttpStatus } from '@nestjs/common';
import { LaunchError } from '@src/common/exceptions/launch-error';
import { ResponseError } from '@src/common/exceptions/response-error';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { LaunchErrorResponseDto } from '@src/dtos/launch-response.dto';
import { LoggerService } from '@src/modules/logger/logger.service';
import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { statics } from '@src/statics/statics';
import { BodyResponseDto } from '@src/dtos/body-response.dto';

@Injectable()
export class ErrorService {
  constructor(private readonly loggerService: LoggerService) { }

  public systemHandler(err: any, customMessage?: string) {
    let response: LaunchErrorResponseDto;
    if (err instanceof LaunchError) {
      response = err.response;
    } else {
      response = {
        message: customMessage ?? statics.messages.labels.unhandlerErrorLabel,
        error: {
          id: v4(),
          message:
            err?.message ?? statics.messages.custom.default.unhandlerErrorMessage,
          stack: err?.stack?.split('\n') ?? [
            `Error: ${statics.messages.custom.default.unhandlerErrorMessage}`,
            `    at ${statics.messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    }
    this.loggerService.error(response.message, 'SYSTEM', 'INIT', response);
    return response;
  }

  public responseHandler(err: any) {
    let response: ErrorResponseDto;
    if (err instanceof ResponseError) {
      response = err.response;
    } else if (err instanceof BadRequestException) {
      const exceptionResponse = err.getResponse();
      response = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        error: {
          id: v4(),
          message: exceptionResponse?.['message']?.join?.(', ') ?? exceptionResponse?.toString() ?? 'Unhandler Bad Request',
          stack: err.stack?.split('\n') || [
            `Error: ${exceptionResponse['message']}`,
            `    at ${statics.messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    } else {
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: statics.messages.labels.unhandlerErrorLabel,
        error: {
          id: v4(),
          message:
            err?.message ?? statics.messages.custom.default.unhandlerErrorMessage,
          stack: err?.stack?.split('\n') ?? [
            `Error: ${statics.messages.custom.default.unhandlerErrorMessage}`,
            `    at ${statics.messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    }
    return response;
  }

  public removePrivateData(logLevel: string, response: BodyResponseDto | ErrorResponseDto) {
    if ('error' in response) {
      delete (response as ErrorResponseDto).error.stack;
      switch (logLevel) {
        case 'WARN':
          if (!statics.constants.logs.logResponses.warn) {
            delete (response as ErrorResponseDto).error.id;
          }
          break;
        case 'ERROR':
          if (statics.constants.logs.logResponses.error) {
            delete (response as ErrorResponseDto).error.id;
          }
          break;
      }
    }
  }
}
