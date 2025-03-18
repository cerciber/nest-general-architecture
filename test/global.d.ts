import { INestApplication } from '@nestjs/common';
import { AccountIdNoPasswordDto } from '@src/modules/api/modules/accounts/dtos/account.dto';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';

declare global {
  // eslint-disable-next-line no-var
  var testEnviroment: {
    app: INestApplication<any>;
    accountsService: AccountsService;
    testAccountPassword: string;
    testInvalidAccountPassword: string;
    validTestAdminUser: AccountIdNoPasswordDto;
    validTestAdminToken: string;
    nonValidTestAdminUser: AccountIdNoPasswordDto;
    validTestClientUser: AccountIdNoPasswordDto;
    validTestClientToken: string;
    nonValidTestClientUser: AccountIdNoPasswordDto;
  };
}

export {};
