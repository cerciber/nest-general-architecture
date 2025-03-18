import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

const AccountInfoNames = {
  _id: '_id',
  account: 'account',
} as const;

export class AccountInfoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsMongoId()
  @IsNotEmpty()
  account: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsPhoneNumber()
  phone?: string;
}

class AccountInfoDto extends OmitType(AccountInfoIdDto, [
  AccountInfoNames._id,
]) {}

export class AccountInfoNoAccountDto extends OmitType(AccountInfoDto, [
  AccountInfoNames.account,
]) {}

export class PartialAccountInfoNoAccountDto extends PartialType(
  AccountInfoNoAccountDto,
) {}
