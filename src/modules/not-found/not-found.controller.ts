import { Controller, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { ResponseError } from '@src/common/exceptions/response-error';
import { statics } from '@src/statics/statics';
import { EndpointConfig } from '@src/common/decorators/enpoint-config.decorator';

@ApiTags(statics.paths.default.tag)
@Controller()
export class NotFoundController {
  constructor() {}

  @EndpointConfig(statics.paths.default, [
    {
      status: HttpStatus.NOT_FOUND,
      type: ErrorResponseDto,
    },
  ])
  handleNotFound(): ErrorResponseDto {
    throw new ResponseError({
      status: HttpStatus.NOT_FOUND,
      code: statics.codes.noDataFound.code,
      message: statics.codes.noDataFound.message,
      detail: statics.messages.default.noFound,
    });
  }
}
