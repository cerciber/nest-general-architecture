import { Controller, RequestMapping } from '@nestjs/common';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { BodyMessageResponseDto } from '@src/dtos/body-message-response.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';

@ApiTags(statics.paths.root.tag)
@Controller()
export class ApiController {
  constructor() {}

  @RequestMapping({
    path: statics.paths.root.path,
    method: statics.paths.root.method,
  })
  @ApiBearerAuth()
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
  getRootMessage(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      code: statics.codes.dataRetrievedSuccessfully.code,
      message: statics.codes.dataRetrievedSuccessfully.message,
      detail: statics.messages.root.success,
      body: {
        message: statics.messages.root.hello,
      },
    };
  }
}
