import { IsObject, IsDefined } from 'class-validator';
import { BasicResponseDto } from './basicResponse.dto';

export class BodyResponseDto extends BasicResponseDto {
  @IsDefined()
  @IsObject()
  body: Record<string, any>;
}
