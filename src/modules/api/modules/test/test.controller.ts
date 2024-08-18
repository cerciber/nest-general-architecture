import { Controller, HttpCode, RequestMapping } from '@nestjs/common';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/response-error';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { BodyMessageResponseDto } from '@src/dtos/body-message-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(statics.paths.test.tag)
@Controller()
export class TestController {
  @RequestMapping({
    path: statics.paths.testSuccess.path,
    method: statics.paths.testSuccess.method,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  getTestSuccess(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataRetrievedSuccessfully.code,
      message: statics.codes.dataRetrievedSuccessfully.message,
      detail: statics.messages.test.success,
      body: {
        message: statics.messages.test.success,
      },
    };
  }

  @RequestMapping({
    path: statics.paths.testError.path,
    method: statics.paths.testError.method,
  })
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
  })
  getTestError(): ErrorResponseDto {
    throw new ResponseError({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: statics.codes.retrievingDataError.code,
      message: statics.codes.retrievingDataError.message,
      detail: statics.messages.test.error,
    });
  }
}
