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
import { HandlerErrorService } from '@src/services/handlerError.service';
import { LoggerService } from '@src/services/logger.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly handlerErrorService: HandlerErrorService,
    private readonly loggerService: LoggerService
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      catchError((err) => {
        return of(this.handlerErrorService.responseHandler(err));
      }),
      tap((response: BodyResponseDto | ErrorResponseDto) => {
        this.loggerService.logResponse(response);
        res.status(response.status);
      }),
    );
  }
}
