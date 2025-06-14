import { Module } from '@nestjs/common';
import { BuyRequestService } from './buy-request.service';
import { BuyRequestController } from './buy-request.controller';
import { DatabaseModule } from 'src/database/database.module';
import { buyRequestProviders } from './buy-request.providers';
import { usersProviders } from 'src/users/users.providers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [BuyRequestController],
  providers: [BuyRequestService, ...buyRequestProviders],
  exports: [BuyRequestService, ...buyRequestProviders]
})
export class BuyRequestModule {}
