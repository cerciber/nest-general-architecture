import { config as dotenvConfig } from 'dotenv';
import { InputDataValidator } from '@src/entities/inputDataValidator';
import { HandlerResponse } from '@src/entities/handlerError';
import { constants } from '@src/config/constants/constants';

// Config envs
dotenvConfig({ path: constants.envs.envFilePath });
let envsValid = true;
try {
  // Validate start input data
  new InputDataValidator().validateEnvs();
} catch (err) {
  envsValid = false;
  // Handler error
  HandlerResponse.systemHandler(err);
}

export { envsValid };
