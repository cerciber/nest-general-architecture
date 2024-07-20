import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { ResponseError } from '@src/common/exceptions/responseError';
import { statics } from '@src/config/statics/statics';

@ApiTags(statics.paths.default.tag)
@Controller(statics.paths.default.path)
export class NotFoundController {
  constructor() { }

  @Get()
  @HttpCode(HttpStatus.NOT_FOUND)
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
