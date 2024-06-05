import { IErrorInput } from '@src/common/dto/response/errorInput.interface';
import { IErrorResponse } from '@src/common/dto/response/errorResponse.interface';

export class ResponseError extends Error {
  public response: IErrorResponse;
  constructor(public responseInput: IErrorInput) {
    super(responseInput.message);
    this.response = {
      status: responseInput.status,
      message: responseInput.message,
      error: this.stack.split('\n'),
    };
  }
}
