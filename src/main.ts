import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerBuilder } from '@src/entities/swaggerBuilder';
import { config } from '@src/config/config';
import { validationConfig } from './entities/validationConfig';

async function bootstrap() {
  // Create app
  const app = await NestFactory.create(AppModule);

  // Only allow validate data
  app.useGlobalPipes(new validationConfig().build());

  // Create Swagger Doc
  new SwaggerBuilder(app);

  // Listen
  await app.listen(config.constants.nestPort);
}

bootstrap();
