import { PartialAccountDto } from './partial-account.dto';
import { PartialAccountIdDto } from './partial-account-id.dto';

export class UpdateAccountRequestDto {
  filter: PartialAccountIdDto;
  update: PartialAccountDto;
}