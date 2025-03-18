import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { LoggerService } from '@src/modules/logger/services/logger.service';
import { ErrorService } from '@src/services/error.service';
import { Response } from 'express';

@Catch()
export class DefaultErrorFilter implements ExceptionFilter {
  constructor(
    private readonly errorService: ErrorService,
    private readonly loggerService: LoggerService,
  ) {}

  private async manageCatch(err: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    if (!res.headersSent) {
      const response = await this.errorService.responseHandler(await err);
      const logLevel = this.loggerService.logResponse(response);
      await this.errorService.removePrivateData(logLevel, response);
      res.status(Number(response.status)).json(response);
    }
  }

  async catch(err: unknown, host: ArgumentsHost): Promise<void> {
    await this.manageCatch(err, host);
  }
}
