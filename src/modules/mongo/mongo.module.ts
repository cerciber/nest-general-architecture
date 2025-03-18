import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schemas/account.schema';
import { AccountInfoSchema } from './schemas/account-info.schema';
import { CustomConfigModule } from '@src/modules/custom-config/custom-config.module';
import { CustomConfigService } from '@src/modules/custom-config/services/custom-config.service';
import { LoggerService } from '@src/modules/logger/services/logger.service';
import { LoggerModule } from '@src/modules/logger/logger.module';
import { statics } from '@src/common/statics/statics';

const models = [
  { name: statics.constants.mongoose.schemas.Account, schema: AccountSchema },
  {
    name: statics.constants.mongoose.schemas.AccountInfo,
    schema: AccountInfoSchema,
  },
];

@Global()
@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule, LoggerModule],
      useFactory: async (
        customConfigService: CustomConfigService,
        loggerService: LoggerService,
      ) => {
        loggerService.info('Connecting to MongoDB...', 'SYSTEM', 'INIT');
        return {
          uri: customConfigService.env.MONGO_URI,
          connectionFactory: (connection): ((connection: any) => any) => {
            if (connection.readyState === 1) {
              loggerService.info(
                `Mongo connection established.`,
                'SYSTEM',
                'INIT',
              );
            }
            return connection;
          },
        };
      },
      inject: [CustomConfigService, LoggerService],
    }),
    MongooseModule.forFeature(models),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class MongoModule {}
