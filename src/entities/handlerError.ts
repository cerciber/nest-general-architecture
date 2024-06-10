import { HttpStatus } from '@nestjs/common';
import { LaunchError } from '@src/common/exceptions/responseError/launchError';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { config } from '@src/config/config';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { LaunchErrorResponseDto } from '@src/dto/launchResponse.dto';
import { Logger } from '@src/entities/logger';

export class HandlerResponse {
  public static systemHandler(err: any) {
    let response: LaunchErrorResponseDto;
    if (err instanceof LaunchError) {
      response = err.response;
    } else {
      response = {
        message: config.messages.labels.unhandlerErrorLabel,
        error: {
          message:
            err?.message ??
            config.messages.custom.default.unhandlerErrorMessage,
          stack: err?.stack?.split('\n') ?? [
            `Error: ${config.messages.custom.default.unhandlerErrorMessage}`,
            `    at ${config.messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    }
    Logger.log(response);
    return response;
  }

  public static responseHandler(err: any) {
    let response: ErrorResponseDto;
    if (err instanceof ResponseError) {
      response = err.response;
    } else {
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: config.messages.labels.unhandlerErrorLabel,
        error: {
          message:
            err?.message ??
            config.messages.custom.default.unhandlerErrorMessage,
          stack: err?.stack?.split('\n') ?? [
            `Error: ${config.messages.custom.default.unhandlerErrorMessage}`,
            `    at ${config.messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    }
    return response;
  }
}