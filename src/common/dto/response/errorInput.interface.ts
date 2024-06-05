import { IResponse } from './response.interface';

export interface IErrorInput extends IResponse {
  body?: never;
  error?: never;
}
