import { LaunchErrorResponseDto } from '@src/dto/launchResponse.dto';
import { v4 } from 'uuid';

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
        id: v4(),
        message: errorMessage,
        stack: this.stack.split('\n'),
      },
    };
  }
}
