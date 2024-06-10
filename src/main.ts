import { config as dotenvConfig } from 'dotenv';

// Config envs
dotenvConfig();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerBuilder } from '@src/entities/swaggerBuilder';
import { config } from '@src/config/config';
import { validationConfig } from './entities/validationConfig';
import { InputDataValidator } from './entities/inputDataValidator';
import { HandlerResponse } from './entities/handlerError';

async function bootstrap() {
  try {
    // Validate start input data
    await new InputDataValidator().validateEnvs();

    // Create app
    const app = await NestFactory.create(AppModule);

    // Only allow valid class validators data
    app.useGlobalPipes(new validationConfig().build());

    // Create Swagger Doc
    new SwaggerBuilder(app);

    // Listen
    await app.listen(config.envs.PORT);
  } catch (err) {
    // Handler error
    HandlerResponse.systemHandler(err);
  }
}

bootstrap();
