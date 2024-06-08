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
import { ConfigDto } from '@src/dto/config.dto';

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
            message:
              err?.message ?? ConfigDto.messages.labels.unhandlerErrorLabel,
            error: {
              message: ConfigDto.messages.custom.default.unhandlerErrorMessage,
              stack: err?.stack?.split('\n') ?? [
                `Error: ${ConfigDto.messages.custom.default.unhandlerErrorMessage}`,
                ConfigDto.messages.custom.default.noTraceAvalible,
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
