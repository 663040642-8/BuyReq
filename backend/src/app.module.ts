import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BuyRequestModule } from './buy-request/buy-request.module';
import { SellRequestModule } from './sell-request/sell-request.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    BuyRequestModule,
    SellRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
