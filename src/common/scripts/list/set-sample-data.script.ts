import { INestApplicationContext } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';
import { AccountDto } from '@src/modules/api/modules/accounts/dtos/account.dto';
import { validateDto } from '../utils/validate-dto';

async function generateAccountData(): Promise<AccountDto[]> {
  const accounts: AccountDto[] = [];

  // Generate admin account
  accounts.push({
    username: 'admin',
    password: 'ABC#abc#123',
    role: statics.constants.roles.admin,
    accountInfo: {
      name: 'Administrator',
      email: 'admin@example.com',
      phone: '+573202138120',
    },
  });

  // Generate client accounts
  for (let i = 1; i <= 9; i++) {
    accounts.push({
      username: `client_${i}`,
      password: 'ABC#abc#123',
      role: statics.constants.roles.client,
      accountInfo: {
        name: `Client ${i}`,
        email: `client_${i}@example.com`,
        phone: `+57320213812${i}`,
      },
    });
  }
  return accounts;
}

async function validateAccountDtos(
  app: INestApplicationContext,
  accounts: AccountDto[],
): Promise<void> {
  for (let i = 0; i < accounts.length; i++) {
    await validateDto(app, accounts[i], AccountDto);
  }
}

export default async function setSampleData(
  app: INestApplicationContext,
): Promise<void> {
  const accountsService = app.get(AccountsService);
  const accounts = await generateAccountData();
  await validateAccountDtos(app, accounts);
  await accountsService.deleteAll();
  await accountsService.createMany(accounts);
}
