export class ConstantsDto {
  validations: {
    whitelist: boolean;
    forbidNonWhitelisted: boolean;
  };
  winston: {
    maxBitsPerFile: number;
    maxFiles: number;
  };
}
