import { HttpStatus } from '@nestjs/common';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { v4 } from 'uuid';

export class LaunchError extends Error {
  public response: ErrorResponseDto;
  constructor(
    public code: string,
    public message: string,
    public detail: string,
  ) {
    super(detail);
    this.response = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: code,
      message: message,
      detail: detail,
      error: {
        id: v4(),
        stack: this.stack?.split('\n') ?? [],
      },
    };
  }
}
