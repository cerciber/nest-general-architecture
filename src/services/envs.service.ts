import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { EnvsDto } from '@src/config/envs/envs.dto';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LaunchError } from '@src/common/exceptions/launch-error';
import { statics } from '@src/config/statics/statics';

@Injectable()
export class EnvsService extends NestConfigService {
  private envConfig: EnvsDto;

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