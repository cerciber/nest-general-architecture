import { Controller, Get, HttpCode } from '@nestjs/common';
import { statics } from '@src/config/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/response-error';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { BodyMessageResponseDto } from '@src/dtos/body-message-response.dto';
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
