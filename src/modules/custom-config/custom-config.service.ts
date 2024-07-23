import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvsDto } from '@src/dtos/envs.dto';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LaunchError } from '@src/common/exceptions/launch-error';
import { statics } from '@src/statics/statics';


@Injectable()
export class CustomConfigService extends ConfigService {
  private envConfig: EnvsDto;

  constructor() {
    super();
    this.validateEnvs();
  }

  public validateEnvs() {
    if (
      !statics.constants.validations.validEnviroments.includes(statics.constants.envs.enviroment)
    ) {
      throw new LaunchError(
        statics.messages.labels.startErrorLabel,
        statics.messages.custom.default.noValidEnviroment,
      );
    }

    const validatedConfig = plainToInstance(EnvsDto, statics.constants.envs.processEnv, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new LaunchError(statics.messages.labels.startErrorLabel, errors.toString());
    }
    this.envConfig = validatedConfig;
  }

  get env(): EnvsDto {
    return this.envConfig;
  }
}