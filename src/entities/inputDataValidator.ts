import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvsDto } from '@src/config/envs/envs.dto';
import { LaunchError } from '@src/common/exceptions/responseError/launchError';
import { config } from '@src/config/config';

export class InputDataValidator {
  public validateEnvs() {
    if (
      !config.constants.validations.validEnviroments.includes(
        process.env.NODE_ENV,
      )
    ) {
      throw new LaunchError(
        config.messages.labels.startErrorLabel,
        config.messages.custom.default.noValidEnviroment,
      );
    }

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
