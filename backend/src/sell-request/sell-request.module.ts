import { Module } from '@nestjs/common';
import { SellRequestService } from './sell-request.service';
import { SellRequestController } from './sell-request.controller';
import { DatabaseModule } from 'src/database/database.module';
import { sellRequestProviders } from './sell-request.providers';
import { UsersModule } from 'src/users/users.module';
import { BuyRequestModule } from 'src/buy-request/buy-request.module';

@Module({
  imports: [DatabaseModule, UsersModule, BuyRequestModule],
  controllers: [SellRequestController],
  providers: [SellRequestService, ...sellRequestProviders],
  exports: [SellRequestService, ...sellRequestProviders]
})
export class SellRequestModule {}
