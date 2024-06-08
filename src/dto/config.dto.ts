import { constants } from '@src/config/constants/constants';
import { messages } from '@src/config/messages/messages';
import { ConstantsDto } from '@src/config/constants/constants.dto';
import { MessagesDto } from '@src/config/messages/messages.dto';
import { PathsDto } from '@src/config/paths/paths.dto';
import { paths } from '@src/config/paths/paths';

export class ConfigDto {
  static constants: ConstantsDto = constants;
  static messages: MessagesDto = messages;
  static paths: PathsDto = paths;
}
