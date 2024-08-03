import { Controller, Get, HttpCode } from '@nestjs/common';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { BodyMessageResponseDto } from '@src/dtos/body-message-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(statics.paths.root.tag)
@Controller(statics.paths.root.path)
export class ApiController {
  constructor() { }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
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
