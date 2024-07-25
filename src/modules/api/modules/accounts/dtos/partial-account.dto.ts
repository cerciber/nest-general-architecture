import { PartialType } from '@nestjs/mapped-types';
import { AccountDto } from './account.dto';

export class PartialAccountDto extends PartialType(AccountDto) { }