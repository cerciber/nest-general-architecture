import { Injectable, ValidationPipe } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';

@Injectable()
export class DTOsService {
  public async validationPipe(): Promise<ValidationPipe> {
    return new ValidationPipe({
      whitelist: statics.constants.validations.whitelist,
      forbidNonWhitelisted: statics.constants.validations.forbidNonWhitelisted,
      skipMissingProperties: true,
    });
  }
}
