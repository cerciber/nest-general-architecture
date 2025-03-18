import { HttpStatus } from '@nestjs/common';
import { LaunchError } from '@src/common/exceptions/launch-error';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { LoggerService } from '@src/modules/logger/services/logger.service';
import { statics } from '@src/common/statics/statics';
import { v4 } from 'uuid';

async function isLaunchError(err: any): Promise<boolean> {
  return err instanceof LaunchError;
}

async function getLaunchErrorResponse(
  err: LaunchError,
): Promise<ErrorResponseDto> {
  return err.response;
}

async function getDefaultErrorResponse(err: any): Promise<ErrorResponseDto> {
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: statics.codes.startError.code,
    message: statics.codes.startError.message,
    detail: err?.message ?? statics.messages.default.unhandledError,
    error: {
      id: v4(),
      stack: err?.stack?.split('\n') ?? [
        `Error: ${statics.messages.default.unhandledError}`,
        `    at ${statics.messages.default.noTraceAvailable}`,
      ],
    },
  };
}

async function logResponse(
  loggerService: LoggerService,
  response: ErrorResponseDto,
): Promise<void> {
  loggerService.error(response.message, 'SYSTEM', 'INIT', response);
}

export async function startSystemErrorHandler(
  loggerService: LoggerService,
  err: any,
): Promise<ErrorResponseDto> {
  let response: ErrorResponseDto;
  if (await isLaunchError(err)) response = await getLaunchErrorResponse(err);
  else response = await getDefaultErrorResponse(err);
  await logResponse(loggerService, response);
  return response;
}
