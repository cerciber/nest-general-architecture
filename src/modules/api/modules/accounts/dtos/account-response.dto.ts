import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { AccountIdNoPasswordDto } from './account.dto';
import { Type } from 'class-transformer';

export class AccountResponseDto extends BodyResponseDto {
  @ValidateNested()
  @Type(() => AccountIdNoPasswordDto)
  body: AccountIdNoPasswordDto;
}

export class AccountsResponseDto extends BodyResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountIdNoPasswordDto)
  body: AccountIdNoPasswordDto[];
}
