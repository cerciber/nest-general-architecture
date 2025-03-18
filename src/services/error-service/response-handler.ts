import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/response-error';
import { replacePlaceholders } from '@src/common/utils/replace-placeholders';
import { statics } from '@src/common/statics/statics';
import { v4 } from 'uuid';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';

async function isResponseError(err: any): Promise<boolean> {
  return err instanceof ResponseError;
}

async function isBadRequestException(err: any): Promise<boolean> {
  return err instanceof BadRequestException;
}

async function getResponseErrorResponse(
  err: ResponseError,
): Promise<ErrorResponseDto> {
  return err.response;
}

async function getBadRequestExceptionResponse(
  err: BadRequestException,
): Promise<ErrorResponseDto> {
  const exceptionResponse = err.getResponse() as any;
  return {
    status: HttpStatus.BAD_REQUEST,
    code: statics.codes.badRequest.code,
    message: statics.codes.badRequest.message,
    detail:
      replacePlaceholders(statics.messages.default.badRequest, [
        exceptionResponse?.message?.join?.(', ') ??
          exceptionResponse?.message?.toString?.() ??
          exceptionResponse.toString(),
      ]) ?? statics.messages.default.unhandledError,
    error: {
      id: v4(),
      stack: err.stack?.split('\n') || [
        `Error: ${exceptionResponse?.message}`,
        `    at ${statics.messages.default.noTraceAvailable}`,
      ],
    },
  };
}

async function getDefaultErrorResponse(err: any): Promise<ErrorResponseDto> {
  return {
    status: err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
    code: statics.codes.unhandledError.code,
    message: statics.codes.unhandledError.message,
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

export async function responseHandler(err: any): Promise<ErrorResponseDto> {
  if (await isResponseError(err)) return getResponseErrorResponse(err);
  else if (await isBadRequestException(err))
    return getBadRequestExceptionResponse(err);
  else return await getDefaultErrorResponse(err);
}
