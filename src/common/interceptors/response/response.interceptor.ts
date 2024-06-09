import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BodyResponseDto } from '@src/dto/bodyResponse.dto';
import { ResponseError } from '@src/common/exceptions/responseError/responseError';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { config } from '@src/config/config';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ResponseError) {
          return of(err.response);
        } else {
          const errorResponse: ErrorResponseDto = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err?.message ?? config.messages.labels.unhandlerErrorLabel,
            error: {
              message: config.messages.custom.default.unhandlerErrorMessage,
              stack: err?.stack?.split('\n') ?? [
                `Error: ${config.messages.custom.default.unhandlerErrorMessage}`,
                `    at ${config.messages.custom.default.noTraceAvalible}`,
              ],
            },
          };
          return of(errorResponse);
        }
      }),
      tap((response: BodyResponseDto | ErrorResponseDto) => {
        res.status(response.status);
        console.log('_____________________________');
        console.log('Response:', response);
      }),
    );
  }
}
