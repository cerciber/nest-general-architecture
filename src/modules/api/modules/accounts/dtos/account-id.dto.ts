import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AccountDto } from './account.dto';

export class AccountIdDto extends AccountDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}