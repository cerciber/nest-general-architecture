export class MessagesDto {
  labels: {
    successLabel: string;
    errorLabel: string;
    noFoundLabel: string;
    unhandlerErrorLabel: string;
    startErrorLabel: string;
  };
  custom: {
    root: {
      rootMessage: string;
    };
    test: {
      successMessage: string;
      errorMessage: string;
    };
    default: {
      noFoundMessage: string;
      unhandlerErrorMessage: string;
      noTraceAvalible: string;
      noValidEnviroment: string;
    };
  };
}
