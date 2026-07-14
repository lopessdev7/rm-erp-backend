import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.ADMIN_JWT_SECRET }),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
