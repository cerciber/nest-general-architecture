import { ValidationPipe } from '@nestjs/common';
import { config } from '@src/config/config';

export class validationConfig {
  public build(): ValidationPipe {
    return new ValidationPipe({
      whitelist: config.constants.validations.whitelist,
      forbidNonWhitelisted: config.constants.validations.forbidNonWhitelisted,
    });
  }
}
