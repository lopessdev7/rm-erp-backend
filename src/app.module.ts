import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { PrismaService } from './prisma.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AppAuthModule } from './app-auth/app-auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdminAuthModule,
    AppAuthModule,
    CompaniesModule,
    ProductsModule,
    CustomersModule,
    SalesModule,
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
