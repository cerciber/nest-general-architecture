import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BodyResponseDto } from '@src/dto/bodyResponse.dto';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { HandlerResponse } from '@src/entities/handlerError';
import { logResponse } from './logResponse';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((err) => {
        return of(HandlerResponse.responseHandler(err));
      }),
      tap((response: BodyResponseDto | ErrorResponseDto) => {
        logResponse(response);
        res.status(response.status);
      }),
    );
  }
}
