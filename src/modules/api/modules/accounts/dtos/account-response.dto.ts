import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsDefined, IsObject } from 'class-validator';
import { AccountIdDto } from './account.dto';

export class AccountResponseDto extends BodyResponseDto {
  @IsDefined()
  @IsObject()
  body: AccountIdDto;
}

export class AccountsResponseDto extends BodyResponseDto {
  @IsDefined()
  @IsObject()
  body: AccountIdDto[];
}