import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { shopsProviders } from './shops.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ShopsService, ...shopsProviders],
  controllers: [ShopsController]
})
export class ShopsModule {}
