import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.APP_JWT_SECRET })],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
