import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { statics } from '@src/common/statics/statics';

async function errorResponse(
  response: BodyResponseDto | ErrorResponseDto,
): Promise<boolean> {
  return 'error' in response;
}

async function removeErrorStack(
  response: ErrorResponseDto,
): Promise<ErrorResponseDto> {
  if (response.error) delete response.error.stack;
  return response;
}

async function removeError(
  logLevel: string,
  response: ErrorResponseDto,
): Promise<ErrorResponseDto> {
  switch (logLevel) {
    case 'WARN':
      if (!statics.constants.logs.logResponses.warn) {
        delete response.error;
      }
      break;
    case 'ERROR':
      if (statics.constants.logs.logResponses.error) {
        delete response.error;
      }
      break;
  }
  return response;
}

async function removeErrorPrivateData(
  logLevel: string,
  response: ErrorResponseDto,
): Promise<ErrorResponseDto> {
  await removeErrorStack(response);
  await removeError(logLevel, response);
  return response;
}

export async function removePrivateData(
  logLevel: string,
  response: BodyResponseDto | ErrorResponseDto,
): Promise<void> {
  if (await errorResponse(response))
    removeErrorPrivateData(logLevel, response as ErrorResponseDto);
}
