export interface IResponse {
  status: number;
  message: string;
  body: { [key: string]: any };
}
