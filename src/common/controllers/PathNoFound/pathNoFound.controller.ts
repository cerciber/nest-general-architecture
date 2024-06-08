import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/common/dto/response/errorResponse.dto';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';

@ApiTags('Default')
@Controller('*')
export class PathNoFoundController {
  @Get()
  handleNotFound(): ErrorResponseDto {
    throw new ResponseError({
      status: HttpStatus.NOT_FOUND,
      message: 'Path Not Found',
    });
  }
}
