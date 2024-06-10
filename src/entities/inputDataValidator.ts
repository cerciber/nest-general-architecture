import * as dotenv from 'dotenv';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvsDto } from '@src/config/envs/envs.dto';
import { LaunchError } from '@src/common/exceptions/responseError/launchError';
import { config } from '@src/config/config';

export class InputDataValidator {
  public async validateEnvs() {
    dotenv.config({ path: '.env' });
    const validatedConfig = plainToInstance(EnvsDto, process.env, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new LaunchError(
        config.messages.labels.startErrorLabel,
        errors.toString(),
      );
    }
    return validatedConfig;
  }
}
