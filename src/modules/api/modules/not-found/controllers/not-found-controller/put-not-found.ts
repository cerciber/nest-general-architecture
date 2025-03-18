import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { ResponseError } from '@src/common/exceptions/response-error';

export const putNotFoundConfig = {
  path: statics.paths.default.subpaths.defaultPut,
  apiResponses: [
    {
      status: HttpStatus.NOT_FOUND,
      type: ErrorResponseDto,
    },
  ],
};

export async function putNotFound(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.NOT_FOUND,
    code: statics.codes.noDataFound.code,
    message: statics.codes.noDataFound.message,
    detail: statics.messages.default.noFound,
  });
}
