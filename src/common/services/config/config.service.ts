import { Injectable, Global } from '@nestjs/common';
import { constants } from '@src/config/constants/constants';
import { IConstants } from '@src/config/constants/constants.interface';

@Injectable()
@Global()
export class ConfigService {
  readonly constants: IConstants = constants;
}
