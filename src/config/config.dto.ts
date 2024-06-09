import { ConstantsDto } from '@src/config/constants/constants.dto';
import { MessagesDto } from '@src/config/messages/messages.dto';
import { PathsDto } from '@src/config/paths/paths.dto';
import { DocsDto } from '@src/config/docs/docs.dto';

export class ConfigDto {
  constants: ConstantsDto;
  messages: MessagesDto;
  paths: PathsDto;
  docs: DocsDto;
}
