import { envsValid } from '@src/utils/configEnvs';
import { config } from '@src/config/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerBuilder } from '@src/entities/swaggerBuilder';
import { validationConfig } from '@src/entities/validationConfig';
import { HandlerResponse } from '@src/entities/handlerError';

async function bootstrap() {
  try {
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

if (envsValid) {
  bootstrap();
}
