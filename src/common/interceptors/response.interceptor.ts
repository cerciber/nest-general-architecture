import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BodyResponseDto } from '@src/dto/body-response.dto';
import { ErrorResponseDto } from '@src/dto/error-response.dto';
import { ErrorService } from '@src/services/error.service';
import { LoggerService } from '@src/services/logger.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly errorService: ErrorService,
    private readonly loggerService: LoggerService
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((err) => {
        return of(this.errorService.responseHandler(err));
      }),
      tap((response: BodyResponseDto | ErrorResponseDto) => {
        this.loggerService.logResponse(response);
        res.status(response.status);
      }),
    );
  }
}
