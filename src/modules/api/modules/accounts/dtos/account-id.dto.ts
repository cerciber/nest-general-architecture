import { IsMongoId } from 'class-validator';
import { AccountDto } from './account.dto';

export class AccountIdDto extends AccountDto {
  @IsMongoId()
  readonly id: string;
}