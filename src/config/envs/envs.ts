import { EnvsDto } from './envs.dto';

export const envs: EnvsDto = {
  // Port where nest will be running
  PORT: Number(process.env.PORT),
};