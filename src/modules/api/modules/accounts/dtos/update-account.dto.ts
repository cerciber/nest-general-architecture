import { PartialAccountDto } from './partial-account.dto';
import { PartialAccountIdDto } from './partial-account-id.dto';
import { IsDefined, IsObject } from 'class-validator';

export class UpdateAccountRequestDto {
  @IsDefined()
  @IsObject()
  filter: PartialAccountIdDto;

  @IsDefined()
  @IsObject()
  update: PartialAccountDto;
}