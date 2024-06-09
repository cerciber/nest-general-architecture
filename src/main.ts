import { config as dotenvConfig } from 'dotenv';

// Config envs
dotenvConfig();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerBuilder } from '@src/entities/swaggerBuilder';
import { config } from '@src/config/config';
import { validationConfig } from './entities/validationConfig';
import { isNumber } from 'class-validator';

async function bootstrap() {
  // Create app
  const app = await NestFactory.create(AppModule);

  // Only allow validate data
  app.useGlobalPipes(new validationConfig().build());

  // Create Swagger Doc
  new SwaggerBuilder(app);

  // Listen
  if (!isNumber(Number(config.envs.nestPort))) {
    throw new Error('Nest port is not valid.');
  }
  await app.listen(config.envs.nestPort);
}

bootstrap();
