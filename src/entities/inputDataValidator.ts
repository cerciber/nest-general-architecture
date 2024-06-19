import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvsDto } from '@src/config/envs/envs.dto';
import { LaunchError } from '@src/common/exceptions/responseError/launchError';
import { constants } from '@src/config/constants/constants';
import { messages } from '@src/config/messages/messages';

export class InputDataValidator {
  public validateEnvs() {
    if (
      !constants.validations.validEnviroments.includes(process.env.NODE_ENV)
    ) {
      throw new LaunchError(
        messages.labels.startErrorLabel,
        messages.custom.default.noValidEnviroment,
      );
    }

    const validatedConfig = plainToInstance(EnvsDto, process.env, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new LaunchError(messages.labels.startErrorLabel, errors.toString());
    }
    return validatedConfig;
  }
}
