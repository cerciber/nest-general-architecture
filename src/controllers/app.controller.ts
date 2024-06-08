import { Controller, Get, HttpCode } from '@nestjs/common';
import { ConfigDto } from '@src/dto/config.dto';
import { HttpStatus } from '@nestjs/common';
import { BodyMessageResponseDto } from '@src/dto/bodyMessageResponse.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ConfigDto.paths.root.tag)
@Controller(ConfigDto.paths.root.path)
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
      message: ConfigDto.messages.labels.successLabel,
      body: {
        message: ConfigDto.messages.custom.root.rootMessage,
      },
    };
  }
}
