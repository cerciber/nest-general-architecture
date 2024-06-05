import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@src/common/services/config/config.service';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { ISuccessResponse } from './common/dto/response/successResponse.interface';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): ISuccessResponse {
    return {
      status: HttpStatus.OK,
      message: this.configService.messages.successInformation,
      body: {
        message: this.configService.constants.rootText,
      },
    };
  }

  @Get('/error')
  getHelloWithError() {
    throw new ResponseError({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Test response error',
    });
  }
}
