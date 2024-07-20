import { Controller, Get, HttpCode } from '@nestjs/common';
import { statics } from '@src/config/statics';
import { HttpStatus } from '@nestjs/common';
import { BodyMessageResponseDto } from '@src/dto/bodyMessageResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(statics.paths.root.tag)
@Controller(statics.paths.root.path)
export class AppController {
  constructor() { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  getRootMessage(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: statics.messages.labels.successLabel,
      body: {
        message: statics.messages.custom.root.rootMessage,
      },
    };
  }
}
