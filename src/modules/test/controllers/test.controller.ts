import { Controller, Get, HttpCode } from '@nestjs/common';
import { config } from '@src/config/config';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { BodyMessageResponseDto } from '@src/dto/bodyMessageResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(config.paths.test.tag)
@Controller(config.paths.test.path)
export class TestController {
  constructor() {}

  @Get(config.paths.test.subpaths.success.path)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  getTestSuccess(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: config.messages.labels.successLabel,
      body: {
        message: config.messages.custom.test.successMessage,
      },
    };
  }

  @Get(config.paths.test.subpaths.error.path)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  getTestError(): ErrorResponseDto {
    throw new ResponseError(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: config.messages.labels.errorLabel,
      },
      {
        message: config.messages.custom.test.errorMessage,
      },
    );
  }
}
