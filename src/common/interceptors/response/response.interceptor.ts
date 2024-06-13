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
import Logger from '@src/entities/logger';
import { HandlerResponse } from '@src/entities/handlerError';
import { config } from '@src/config/config';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((err) => {
        return of(HandlerResponse.responseHandler(err));
      }),
      tap((response: BodyResponseDto | ErrorResponseDto) => {
        let logLevel: 'info' | 'warn' | 'error';
        if (response.status >= 0 && response.status < 300) {
          logLevel = 'info';
        } else if (response.status >= 300 && response.status < 500) {
          logLevel = 'warn';
        } else if (response.status >= 500) {
          logLevel = 'error';
        }
        if (
          config.constants.logs.logAllUserResponses ||
          (config.constants.logs.logWarningUserResponses &&
            logLevel === 'warn') ||
          logLevel === 'error'
        ) {
          Logger[logLevel](
            response.message,
            Logger.types.USER,
            'RESPONSE',
            response,
          );
        }
        if (logLevel === 'warn') {
          if (config.constants.request.responseWarningsWithError) {
            if (
              !config.constants.request.responseWithErrorStack &&
              'error' in response
            ) {
              if (
                config.constants.request.responseWithError &&
                'error' in response
              ) {
                delete (response as ErrorResponseDto).error.stack;
              } else {
                delete (response as ErrorResponseDto).error;
              }
            }
          } else {
            delete (response as ErrorResponseDto).error;
          }
        } else if (logLevel === 'error') {
          if (
            !config.constants.request.responseWithErrorStack &&
            'error' in response
          ) {
            if (
              config.constants.request.responseWithError &&
              'error' in response
            ) {
              delete (response as ErrorResponseDto).error.stack;
            } else {
              delete (response as ErrorResponseDto).error;
            }
          }
        }
        res.status(response.status);
      }),
    );
  }
}
