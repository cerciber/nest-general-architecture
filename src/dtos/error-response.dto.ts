import { BasicResponseDto } from './basic-response.dto';
import { ValidateNested } from 'class-validator';
import { ErrorDto } from './error.dto';
import { Type } from 'class-transformer';

export class ErrorResponseDto extends BasicResponseDto {
  @ValidateNested()
  @Type(() => ErrorDto)
  error?: ErrorDto;
}
