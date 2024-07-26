import { PartialType } from '@nestjs/swagger';
import { AccountDto } from './account.dto';

export class PartialAccountDto extends PartialType(AccountDto) { }