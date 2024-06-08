import { BasicResponseDto } from './basicResponse.dto';
import { IsArray, IsDefined, IsString } from 'class-validator';

export class ErrorResponseDto extends BasicResponseDto {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  error: string[];
}
