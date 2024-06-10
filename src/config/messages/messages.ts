import { MessagesDto } from './messages.dto';

export const messages: MessagesDto = {
  labels: {
    successLabel: 'Information has been retrieved successfully.',
    errorLabel: 'An error occurred while retrieving information.',
    noFoundLabel: 'No information found.',
    unhandlerErrorLabel: 'Unhandled error.',
    startErrorLabel: 'An error occurred while starting the application.',
  },
  custom: {
    root: {
      rootMessage:
        'Hi! this is a template to create nest 3 layered architecture. By @cerciber.',
    },
    test: {
      successMessage: 'Test response success.',
      errorMessage: 'Test response error.',
    },
    default: {
      noFoundMessage: 'Path not found.',
      unhandlerErrorMessage: 'An unhandled error occurred.',
      noTraceAvalible: 'No trace available.',
    },
  },
};
