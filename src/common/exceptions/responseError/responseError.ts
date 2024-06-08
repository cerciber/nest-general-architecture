import { BasicResponseDto } from '@src/common/dto/response/basicResponse.dto';
import { ErrorResponseDto } from '@src/common/dto/response/errorResponse.dto';

export class ResponseError extends Error {
  public response: ErrorResponseDto;
  constructor(public responseInput: BasicResponseDto) {
    super(responseInput.message);
    this.response = {
      status: responseInput.status,
      message: responseInput.message,
      error: this.stack.split('\n'),
    };
  }
}
