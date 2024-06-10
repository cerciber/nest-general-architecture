import { LaunchErrorResponseDto } from '@src/dto/launchResponse.dto';

export class LaunchError extends Error {
  public response: LaunchErrorResponseDto;
  constructor(
    public labelMessage: string,
    public errorMessage: string,
  ) {
    super(errorMessage);
    this.response = {
      message: labelMessage,
      error: {
        message: errorMessage,
        stack: this.stack.split('\n'),
      },
    };
  }
}
