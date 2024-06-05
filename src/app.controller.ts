import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@src/common/services/config/config.service';
import { IResponse } from '@src/common/dto/response/response.interface';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';

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

  @Get('/error')
  getHelloWithError(): IResponse {
    throw new ResponseError({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Test response error',
      body: {},
    });
  }
}
