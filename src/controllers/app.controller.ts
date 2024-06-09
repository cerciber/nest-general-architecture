import { Controller, Get, HttpCode } from '@nestjs/common';
import { config } from '@src/config/config';
import { HttpStatus } from '@nestjs/common';
import { BodyMessageResponseDto } from '@src/dto/bodyMessageResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(config.paths.root.tag)
@Controller(config.paths.root.path)
export class AppController {
  constructor() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  getRootMessage(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: config.messages.labels.successLabel,
      body: {
        message: config.messages.custom.root.rootMessage,
      },
    };
  }
}
