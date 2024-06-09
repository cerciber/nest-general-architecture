import { ConstantsDto } from './constants.dto';

export const constants: ConstantsDto = {
  // Port where nest will be running
  nestPort: 3000,
  // Validation options
  validations: {
    // Remove not require data from validations
    whitelist: true,
    //  Throw not allowed data from validations
    forbidNonWhitelisted: true,
  },
};
