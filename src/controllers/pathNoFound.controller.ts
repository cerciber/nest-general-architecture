import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { ConfigDto } from '@src/dto/config.dto';

@ApiTags(ConfigDto.paths.default.tag)
@Controller(ConfigDto.paths.default.path)
export class PathNoFoundController {
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
        message: ConfigDto.messages.labels.noFoundLabel,
      },
      {
        message: ConfigDto.messages.custom.default.noFoundMessage,
      },
    );
  }
}
