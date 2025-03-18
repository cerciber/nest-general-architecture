import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvsDto } from '@src/dtos/envs.dto';
import { validateEnvs } from './custom-config-service/validate-envs';

@Injectable()
export class CustomConfigService extends ConfigService {
  private envConfig: EnvsDto = new EnvsDto();

  constructor() {
    super();
    this.validateEnvs();
  }

  public async validateEnvs(): Promise<void> {
    this.envConfig = await validateEnvs();
  }

  get env(): EnvsDto {
    return this.envConfig;
  }
}
