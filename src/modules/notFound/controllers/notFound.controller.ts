import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { config } from '@src/config/config';

@ApiTags(config.paths.default.tag)
@Controller(config.paths.default.path)
export class NotFoundController {
  constructor() {}

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
        message: config.messages.labels.noFoundLabel,
      },
      config.messages.custom.default.noFoundMessage,
    );
  }
}
