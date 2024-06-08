import { Controller, Get, HttpCode } from '@nestjs/common';
import { ConfigDto } from '@src/dto/config.dto';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { BodyMessageResponseDto } from '@src/dto/bodyMessageResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ConfigDto.paths.test.tag)
@Controller(ConfigDto.paths.test.path)
export class TestController {
  constructor() {}

  @Get(ConfigDto.paths.test.subpaths.success.path)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  getTestSuccess(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: ConfigDto.messages.labels.successLabel,
      body: {
        message: ConfigDto.messages.custom.test.successMessage,
      },
    };
  }

  @Get(ConfigDto.paths.test.subpaths.error.path)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  getTestError(): ErrorResponseDto {
    throw new ResponseError(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ConfigDto.messages.labels.errorLabel,
      },
      {
        message: ConfigDto.messages.custom.test.errorMessage,
      },
    );
  }
}
