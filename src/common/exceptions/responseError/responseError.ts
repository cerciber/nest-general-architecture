import { BasicResponseDto } from '@src/dto/basicResponse.dto';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { MessageDto } from '@src/dto/message.dto';

export class ResponseError extends Error {
  public response: ErrorResponseDto;
  constructor(
    public responseInput: BasicResponseDto,
    public errorMessage: MessageDto,
  ) {
    super(errorMessage.message);
    this.response = {
      status: responseInput.status,
      message: responseInput.message,
      error: {
        message: errorMessage.message,
        stack: this.stack.split('\n'),
      },
    };
  }
}
