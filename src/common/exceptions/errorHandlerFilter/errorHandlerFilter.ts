import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { IResponse } from '@src/common/dto/response/response.interface';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof ResponseError) {
      response.status(exception.response.status).json(exception.response);
    } else if (exception instanceof Error) {
      const errorResponse: IResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        body: {
          error: exception.stack,
        },
      };
      response.status(errorResponse.status).json(errorResponse);
    } else {
      const errorResponse: IResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unhandled Exception',
        body: {},
      };
      response.status(errorResponse.status).json(errorResponse);
    }
  }
}
