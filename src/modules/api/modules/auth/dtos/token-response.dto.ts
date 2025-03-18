import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { ValidateNested } from 'class-validator';
import { TokenDto } from './token.dto';
import { Type } from 'class-transformer';

export class TokenResponseDto extends BodyResponseDto {
  @ValidateNested()
  @Type(() => TokenDto)
  body: TokenDto;
}
