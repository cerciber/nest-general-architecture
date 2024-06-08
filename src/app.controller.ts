import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@src/common/services/config/config.service';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { ErrorResponseDto } from '@src/common/dto/response/errorResponse.dto';
import { BodyMessageResponseDto } from './common/dto/response/bodyMessageResponse.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getRootMessage(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: this.configService.messages.successInformation,
      body: {
        message: this.configService.constants.rootText,
      },
    };
  }

  @Get('test/success')
  getTestSuccess(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: this.configService.messages.successInformation,
      body: {
        message: this.configService.constants.rootText,
      },
    };
  }

  @Get('test/error')
  getTestError(): ErrorResponseDto {
    throw new ResponseError({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Test response error',
    });
  }
}
