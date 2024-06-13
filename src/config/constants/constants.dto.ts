export class ConstantsDto {
  validations: {
    whitelist: boolean;
    forbidNonWhitelisted: boolean;
  };
  logs: {
    maxBitsPerFile: number;
    maxFiles: number;
    enableLogs: boolean;
    enableConsoleLog: boolean;
    enableFileLog: boolean;
    logAllUserResponses: boolean;
    logWarningUserResponses: boolean;
  };
  request: {
    responseWithError: boolean;
    responseWithErrorStack: boolean;
    responseWarningsWithError: boolean;
  };
}
