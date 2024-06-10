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
import { Logger } from '@src/entities/logger';
import { HandlerResponse } from '@src/entities/handlerError';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((err) => {
        return of(HandlerResponse.responseHandler(err));
      }),
      tap((response: BodyResponseDto | ErrorResponseDto) => {
        Logger.log(response);
        res.status(response.status);
      }),
    );
  }
}
