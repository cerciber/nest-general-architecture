import { Injectable, ValidationPipe } from '@nestjs/common';
import { config } from '@src/config/config';

@Injectable()
export class DTOsConfigService {
  public validationPipe(): ValidationPipe {
    return new ValidationPipe({
      whitelist: config.constants.validations.whitelist,
      forbidNonWhitelisted: config.constants.validations.forbidNonWhitelisted,
    });
  }
}
