import { IResponse } from './response.interface';

export interface IErrorResponse extends IResponse {
  body?: never;
  error: string[];
}
