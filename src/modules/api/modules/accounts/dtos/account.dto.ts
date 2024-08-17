import { OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export const AccountNames = {
  id: 'id',
  _id: '_id',
} as const;

export class AccountIdDto {
  @IsMongoId()
  readonly [AccountNames.id]: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}

export class AccountDto extends OmitType(AccountIdDto, [AccountNames.id]) { }

export class PartialAccountIdDto extends PartialType(AccountIdDto) { }

export class PartialAccountDto extends PartialType(AccountDto) { }
