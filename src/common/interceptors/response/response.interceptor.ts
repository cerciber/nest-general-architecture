import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IResponse } from '@src/common/dto/response/response.interface';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { IErrorResponse } from '@src/common/dto/response/errorResponse.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ResponseError) {
          return of(err.response);
        } else {
          const errorResponse: IErrorResponse = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err?.message || 'Unhandled Error',
            error: err?.stack?.split('\n') || 'No stack trace available',
          };
          return of(errorResponse);
        }
      }),
      tap((response: IResponse) => {
        console.log('_____________________________');
        console.log('Response:', response);
      }),
    );
  }
}
