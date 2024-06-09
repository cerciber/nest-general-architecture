export class ConstantsDto {
  nestPort: number;
  validations: {
    whitelist: boolean;
    forbidNonWhitelisted: boolean;
  };
}
