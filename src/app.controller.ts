import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@src/common/services/config/config.service';
import { IResponse } from '@src/common/dto/response/response';
import { HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): IResponse {
    return {
      status: HttpStatus.OK,
      message: this.configService.messages.successInformation,
      body: {
        message: this.configService.constants.rootText,
      },
    };
  }
}
