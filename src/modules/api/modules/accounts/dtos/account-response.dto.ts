import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsDefined, IsObject } from 'class-validator';
import { AccountDto } from './account.dto';

export class AccountResponseDto extends BodyResponseDto {
  @IsDefined()
  @IsObject()
  body: AccountDto;
}