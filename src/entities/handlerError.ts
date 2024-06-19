import { HttpStatus } from '@nestjs/common';
import { LaunchError } from '@src/common/exceptions/responseError/launchError';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { messages } from '@src/config/messages/messages';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { LaunchErrorResponseDto } from '@src/dto/launchResponse.dto';
import Logger from '@src/entities/logger';
import { v4 } from 'uuid';

export class HandlerResponse {
  public static systemHandler(err: any) {
    let response: LaunchErrorResponseDto;
    if (err instanceof LaunchError) {
      response = err.response;
    } else {
      response = {
        message: messages.labels.unhandlerErrorLabel,
        error: {
          id: v4(),
          message:
            err?.message ?? messages.custom.default.unhandlerErrorMessage,
          stack: err?.stack?.split('\n') ?? [
            `Error: ${messages.custom.default.unhandlerErrorMessage}`,
            `    at ${messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    }
    Logger.error(response.message, Logger.types.SYSTEM, 'INIT', response);
    return response;
  }

  public static responseHandler(err: any) {
    let response: ErrorResponseDto;
    if (err instanceof ResponseError) {
      response = err.response;
    } else {
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: messages.labels.unhandlerErrorLabel,
        error: {
          id: v4(),
          message:
            err?.message ?? messages.custom.default.unhandlerErrorMessage,
          stack: err?.stack?.split('\n') ?? [
            `Error: ${messages.custom.default.unhandlerErrorMessage}`,
            `    at ${messages.custom.default.noTraceAvalible}`,
          ],
        },
      };
    }
    return response;
  }
}
