import { ConstantsDto } from './constants.dto';

export const constants: ConstantsDto = {
  // Validation options
  validations: {
    // Remove not require data from validations
    whitelist: true,
    //  Throw not allowed data from validations
    forbidNonWhitelisted: true,
  },
};
