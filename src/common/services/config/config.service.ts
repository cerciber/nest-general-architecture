import { Injectable, Global } from '@nestjs/common';
import { constants } from '@src/config/constants/constants';
import { messages } from '@src/config/messages/messages';
import { IConstants } from '@src/config/constants/constants.interface';
import { IMessages } from '@src/config/messages/messages.interface';

@Injectable()
@Global()
export class ConfigService {
  readonly constants: IConstants = constants;
  readonly messages: IMessages = messages;
}
