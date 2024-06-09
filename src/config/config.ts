import { constants } from '@src/config/constants/constants';
import { messages } from '@src/config/messages/messages';
import { paths } from '@src/config/paths/paths';
import { docs } from '@src/config/docs/docs';
import { envs } from '@src/config/envs/envs';
import { ConfigDto } from './config.dto';

export const config: ConfigDto = {
  constants,
  messages,
  paths,
  docs,
  envs,
};
