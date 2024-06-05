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

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ResponseError) {
          return of(err.response);
        } else {
          const errorResponse: IResponse = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message || 'Unhandled Exception',
            body: {
              stack: err.stack || 'No stack trace available',
            },
          };
          return of(errorResponse);
        }
      }),
      tap((response: IResponse) => {
        console.log('_____________________________');
        console.log('Status:', response.status);
        console.log('Message:', response.message);
        if (response.body.stack) {
          console.log('Stack:', response.body.stack);
        } else {
          console.log('Body:', response.body);
        }
      }),
    );
  }
}
