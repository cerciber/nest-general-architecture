import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { ResponseError } from '@src/common/exceptions/response-error';
import { statics } from '@src/statics/statics';

@ApiTags(statics.paths.default.tag)
@Controller(statics.paths.default.path)
export class NotFoundController {
  constructor() { }

  @Get()
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDto,
  })
  handleNotFound(): ErrorResponseDto {
    throw new ResponseError(
      {
        status: HttpStatus.NOT_FOUND,
        message: statics.messages.labels.noFoundLabel,
      },
      statics.messages.custom.default.noFoundMessage,
    );
  }
}
