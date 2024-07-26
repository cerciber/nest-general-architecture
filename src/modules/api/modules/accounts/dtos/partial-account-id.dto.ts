import { PartialType } from '@nestjs/swagger';
import { AccountIdDto } from './account-id.dto';

export class PartialAccountIdDto extends PartialType(AccountIdDto) { }