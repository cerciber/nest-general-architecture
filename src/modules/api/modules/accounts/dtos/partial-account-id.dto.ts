import { PartialType } from '@nestjs/mapped-types';
import { AccountIdDto } from './account-id.dto';

export class PartialAccountIdDto extends PartialType(AccountIdDto) { }