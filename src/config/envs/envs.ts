import { EnvsDto } from './envs.dto';

export const envs: EnvsDto = {
  PORT: Number(process.env.PORT),
};
