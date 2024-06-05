import { IResponse } from '@src/common/dto/response/response.interface';

export class ResponseError extends Error {
  constructor(public response: IResponse) {
    super(response.message);
    this.response.body.stack = this.stack;
  }
}
