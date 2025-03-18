import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerService } from '@src/services/swagger.service';
import { DTOsService } from '@src/services/dtos.service';
import { ErrorService } from '@src/services/error.service';
import { LoggerService } from '@src/modules/logger/services/logger.service';
import { CustomConfigService } from '@src/modules/custom-config/services/custom-config.service';
import { GlobalGuard } from './modules/api/modules/auth/services/global-guard.service';
import { JwtService } from '@nestjs/jwt';
import { runScript } from '@src/common/scripts/run-script';
import { AccountsService } from './modules/api/modules/accounts/services/accounts.service';
import { INestApplication } from '@nestjs/common';

async function createLoggerService(): Promise<LoggerService> {
  return new LoggerService();
}

async function createApp(
  loggerService: LoggerService,
): Promise<INestApplication<any>> {
  loggerService.info(`Creating app...`, 'SYSTEM', 'INIT');
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    logger: false,
  });
  loggerService.info(`App created.`, 'SYSTEM', 'INIT');
  return app;
}

async function applyConfigurations(
  loggerService: LoggerService,
  app: INestApplication,
): Promise<void> {
  loggerService.info(`Applying app configurations...`, 'SYSTEM', 'INIT');
  app.useGlobalPipes(await app.get(DTOsService).validationPipe()); // Only allow valid DTO's on input class data
  app.useGlobalGuards(
    new GlobalGuard(app.get(JwtService), app.get(AccountsService)),
  ); // Apply global guard
  await new SwaggerService(app).setupSwagger(); // Configurate Swagger Doc
}

async function runServer(
  loggerService: LoggerService,
  app: INestApplication,
): Promise<void> {
  loggerService.info(`Running server...`, 'SYSTEM', 'INIT');
  const customConfigService = app.get(CustomConfigService);
  await app.listen(customConfigService.env.PORT);
  loggerService.info(
    `Server running on port ${customConfigService.env.PORT}.`,
    'SYSTEM',
    'INIT',
  );
}

async function logError(
  loggerService: LoggerService | undefined,
  err: unknown,
): Promise<void> {
  if (loggerService) {
    await new ErrorService(loggerService).startSystemErrorHandler(err);
  } else {
    console.error('(Logger not avaliable)', err);
  }
}

async function bootstrap(): Promise<INestApplication<any>> {
  let loggerService: LoggerService | undefined;
  try {
    loggerService = await createLoggerService();
    const app = await createApp(loggerService);
    await applyConfigurations(loggerService, app);
    await runScript(app);
    await runServer(loggerService, app);
    return app;
  } catch (err) {
    await logError(loggerService, err);
    process.exit(0);
  }
}

export const app = bootstrap();
