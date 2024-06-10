import { BasicResponseDto } from '@src/dto/basicResponse.dto';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';

export class ResponseError extends Error {
  public response: ErrorResponseDto;
  constructor(
    public responseInput: BasicResponseDto,
    public errorMessage: string,
  ) {
    super(errorMessage);
    this.response = {
      status: responseInput.status,
      message: responseInput.message,
      error: {
        message: errorMessage,
        stack: this.stack.split('\n'),
      },
    };
  }
}
