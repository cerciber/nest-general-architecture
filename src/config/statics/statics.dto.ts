import { ConstantsDto } from '@src/config/statics/constants/constants.dto';
import { MessagesDto } from '@src/config/statics/messages/messages.dto';
import { PathsDto } from '@src/config/statics/paths/paths.dto';
import { DocsDto } from '@src/config/statics/docs/docs.dto';
import { EnvsDto } from '../envs/envs.dto';

export class StaticsDto {
  constants: ConstantsDto;
  messages: MessagesDto;
  paths: PathsDto;
  docs: DocsDto;
}
