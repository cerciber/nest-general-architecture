import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { LoggerService } from '@src/modules/logger/services/logger.service';
import { Injectable } from '@nestjs/common';
import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { startSystemErrorHandler } from './error-service/start-system-error-handler';
import { responseHandler } from './error-service/response-handler';
import { removePrivateData } from './error-service/remove-private-data';

@Injectable()
export class ErrorService {
  constructor(private readonly loggerService: LoggerService) {}

  public async startSystemErrorHandler(err: any): Promise<ErrorResponseDto> {
    return startSystemErrorHandler(this.loggerService, err);
  }

  public async responseHandler(err: any): Promise<ErrorResponseDto> {
    return responseHandler(err);
  }

  public async removePrivateData(
    logLevel: string,
    response: BodyResponseDto | ErrorResponseDto,
  ): Promise<void> {
    return removePrivateData(logLevel, response);
  }
}
