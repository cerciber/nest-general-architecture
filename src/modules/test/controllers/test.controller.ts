import { Controller, Get, HttpCode } from '@nestjs/common';
import { statics } from '@src/config/statics';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { BodyMessageResponseDto } from '@src/dto/bodyMessageResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(statics.paths.test.tag)
@Controller(statics.paths.test.path)
export class TestController {

  @Get(statics.paths.test.subpaths.success.path)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  getTestSuccess(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: statics.messages.labels.successLabel,
      body: {
        message: statics.messages.custom.test.successMessage,
      },
    };
  }

  @Get(statics.paths.test.subpaths.error.path)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  getTestError(): ErrorResponseDto {
    throw new ResponseError(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: statics.messages.labels.errorLabel,
      },
      statics.messages.custom.test.errorMessage,
    );
  }
}
