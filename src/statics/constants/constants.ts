export const constants = {
  // Envs configurations
  envs: {
    processEnv: process.env,
    enviroment: process.env.NODE_ENV ?? '',
    envFilePath: `.env.${process.env.NODE_ENV ?? ''}`,
  },
  // Validation options
  validations: {
    // Remove not require data from validations
    whitelist: true,
    //  Throw not allowed data from validations
    forbidNonWhitelisted: true,
    // Valid enviroments
    validEnviroments: ['development', 'staging', 'production'],
  },
  logs: {
    // Max log bits per file
    maxBitsPerFile: 5120000,
    // Max log files
    maxFiles: 5,
    // Enable general logs
    enableLogs: true,
    // Enable console logs
    enableConsoleLog: true,
    // Enable file logs
    enableFileLog: true,
    // Log responses activation
    logResponses: {
      info: true,
      warn: true,
      error: true,
    }
  },
};
