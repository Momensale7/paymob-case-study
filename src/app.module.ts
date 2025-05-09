/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './modules/payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/Auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),PaymentModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
