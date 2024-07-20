import { HttpStatus } from '@nestjs/common';
import { LaunchError } from '@src/common/exceptions/launchError';
import { ResponseError } from '@src/common/exceptions/responseError';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { LaunchErrorResponseDto } from '@src/dto/launchResponse.dto';
import { LoggerService } from '@src/services/logger.service';
import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { statics } from '@src/config/statics';

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
}
