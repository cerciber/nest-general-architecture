import { config as dotenvConfig } from 'dotenv';
import { InputDataValidator } from '@src/entities/inputDataValidator';
import { HandlerResponse } from '@src/entities/handlerError';

// Config envs
dotenvConfig({ path: `.env.${process.env.NODE_ENV || ''}` });
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
