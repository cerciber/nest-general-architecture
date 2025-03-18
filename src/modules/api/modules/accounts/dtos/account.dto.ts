import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { replacePlaceholders } from '@src/common/utils/replace-placeholders';
import { statics } from '@src/common/statics/statics';
import {
  IsMongoId,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsIn,
  ValidateNested,
} from 'class-validator';
import {
  AccountInfoIdDto,
  AccountInfoNoAccountDto,
  PartialAccountInfoNoAccountDto,
} from './account-info.dto';
import { Type } from 'class-transformer';

export const AccountNames = {
  id: 'id',
  _id: '_id',
  username: 'username',
  password: 'password',
  accountInfo: 'accountInfo',
} as const;

export class AccountIdDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: replacePlaceholders(statics.messages.accounts.shortPassword, [
      '8',
    ]),
  })
  @Matches(/(?=.*[A-Z])/, {
    message: statics.messages.accounts.noUppercase,
  })
  @Matches(/(?=.*[a-z])/, {
    message: statics.messages.accounts.noLowercase,
  })
  @Matches(/(?=.*\d)/, {
    message: statics.messages.accounts.noNumber,
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: statics.messages.accounts.noSpecialChar,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(statics.constants.roles))
  role: string;

  @ValidateNested()
  @Type(() => AccountInfoIdDto)
  accountInfo?: AccountInfoIdDto;
}

export class AccountDto extends OmitType(AccountIdDto, [
  AccountNames._id,
  AccountNames.accountInfo,
]) {
  @ValidateNested()
  @Type(() => AccountInfoNoAccountDto)
  accountInfo: AccountInfoNoAccountDto;
}

export class PartialAccountDto extends OmitType(PartialType(AccountDto), [
  AccountNames.accountInfo,
]) {
  @ValidateNested()
  @Type(() => PartialAccountInfoNoAccountDto)
  accountInfo?: PartialAccountInfoNoAccountDto;
}
export class AccountIdNoPasswordDto extends OmitType(AccountIdDto, [
  AccountNames.password,
]) {}
export class AccountUsernameAndPasswordDto extends PickType(AccountIdDto, [
  AccountNames.username,
  AccountNames.password,
]) {}
