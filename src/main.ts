import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerService } from '@src/services/swagger.service';
import { DTOsService } from '@src/services/dtos.service';
import { ErrorService } from '@src/services/error.service';
import { LoggerService } from '@src/modules/logger/logger.service';
import { statics } from '@src/statics/statics';
import { CustomConfigService } from '@src/modules/custom-config/custom-config.service';

async function bootstrap() {
  let loggerService: LoggerService
  try {
    // Create logger
    loggerService = new LoggerService();

    // Create app
    loggerService.info(`Creating app...`, 'SYSTEM', 'INIT');
    const app = await NestFactory.create(AppModule, { abortOnError: false, logger: false });
    loggerService.info(`App created.`, 'SYSTEM', 'INIT');

    // Apply configurations
    loggerService.info(`Applying app configurations...`, 'SYSTEM', 'INIT');
    app.useGlobalPipes(app.get(DTOsService).validationPipe()); // Only allow valid DTO's on input class data
    new SwaggerService(app).setupSwagger(); // Configurate Swagger Doc

    // Run server
    loggerService.info(`Running server...`, 'SYSTEM', 'INIT');
    const customConfigService = app.get(CustomConfigService);
    await app.listen(customConfigService.env.PORT);
    loggerService.info(`Server running on port ${customConfigService.env.PORT}.`, 'SYSTEM', 'INIT');

  } catch (err) {
    if (loggerService) {
      new ErrorService(loggerService).systemHandler(err, statics.messages.labels.startErrorLabel);
    } else {
      console.error("(Logger not avaliable)", err)
    }
  }
}

bootstrap();
