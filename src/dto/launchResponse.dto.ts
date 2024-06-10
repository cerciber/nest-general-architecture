import { IsDefined, IsObject, IsString } from 'class-validator';
import { ErrorDto } from './error.dto';

export class LaunchErrorResponseDto {
  @IsString()
  message: string;

  @IsDefined()
  @IsObject()
  error: ErrorDto;
}
