import { LaunchError } from '@src/common/exceptions/launch-error';
import { EnvsDto } from '@src/dtos/envs.dto';
import { statics } from '@src/common/statics/statics';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

async function validateEnviroment(): Promise<void> {
  if (
    !statics.constants.validations.validEnviroments.includes(
      statics.constants.envs.enviroment,
    )
  ) {
    throw new LaunchError(
      statics.codes.startError.code,
      statics.codes.startError.message,
      statics.messages.default.noValidEnvironment,
    );
  }
}

async function validateEnvVariables(): Promise<EnvsDto> {
  const validatedConfig = plainToInstance(
    EnvsDto,
    statics.constants.envs.processEnv,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new LaunchError(
      statics.codes.startError.code,
      statics.codes.startError.message,
      errors.toString(),
    );
  }

  return validatedConfig;
}

export async function validateEnvs(): Promise<EnvsDto> {
  await validateEnviroment();
  return validateEnvVariables();
}
