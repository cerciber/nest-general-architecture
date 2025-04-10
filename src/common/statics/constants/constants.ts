export const constants = {
  // Envs configurations
  envs: {
    processEnv: process.env,
    enviroment: process.env.NODE_ENV ?? '',
    envFilePath: `.env.${process.env.NODE_ENV ?? ''}`,
  },
  roles: {
    admin: 'admin',
    client: 'client',
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
    maxBitsPerFile: 5120000,
    maxFiles: 5,
    enableLogs: true,
    enableConsoleLog: true,
    enableFileLog: true,
    logResponses: {
      info: false,
      warn: false,
      error: true,
    },
  },
  jwt: {
    tokensExpireIn: '60m',
    ignoreExpiration: false,
  },
  bcrypt: {
    saltRounds: 10,
  },
  mongoose: {
    schemas: {
      Account: 'Account',
      AccountInfo: 'AccountInfo',
    },
  },
};
