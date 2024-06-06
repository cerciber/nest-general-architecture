import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';

@Controller('*')
export class PathNoFoundController {
  @Get()
  handleNotFound() {
    throw new ResponseError({
      status: HttpStatus.NOT_FOUND,
      message: 'Path Not Found',
    });
  }
}
