import { BasicResponseDto } from './basicResponse.dto';
import { IsDefined, IsObject } from 'class-validator';
import { ErrorDto } from './error.dto';

export class ErrorResponseDto extends BasicResponseDto {
  @IsDefined()
  @IsObject()
  error: ErrorDto;
}
