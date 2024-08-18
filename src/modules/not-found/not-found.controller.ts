import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { ResponseError } from '@src/common/exceptions/response-error';
import { statics } from '@src/statics/statics';

@ApiTags(statics.paths.default.tag)
@Controller(statics.paths.default.path)
export class NotFoundController {
  constructor() {}

  @Get()
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  handleNotFound(): ErrorResponseDto {
    throw new ResponseError({
      status: HttpStatus.NOT_FOUND,
      code: statics.codes.noDataFound.code,
      message: statics.codes.noDataFound.message,
      detail: statics.messages.default.noFound,
    });
  }
}
