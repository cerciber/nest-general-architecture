import { EnvsDto } from './envs.dto';

function getEnvs(): EnvsDto {
  return {
    PORT: Number(process.env.PORT),
  };
}

export const envs = getEnvs();
