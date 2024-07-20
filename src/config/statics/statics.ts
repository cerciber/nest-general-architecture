import { constants } from '@src/config/statics/constants/constants';
import { messages } from '@src/config/statics/messages/messages';
import { paths } from '@src/config/statics/paths/paths';
import { docs } from '@src/config/statics/docs/docs';
import { StaticsDto } from './statics.dto';

export const statics: StaticsDto = {
  constants,
  messages,
  paths,
  docs,
};
