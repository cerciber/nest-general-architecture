import { IsDefined } from 'class-validator';
import { BasicResponseDto } from './basic-response.dto';

export class BodyResponseDto extends BasicResponseDto {
  @IsDefined()
  body: Record<string, any> | Record<string, any>[];
}
