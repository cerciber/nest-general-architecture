import { IResponse } from './response.interface';

export interface ISuccessResponse extends IResponse {
  body: { [key: string]: any };
  error?: never;
}
