import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AppAuthGuard } from '../common/guards/app-auth.guard';
import { CustomersService } from './customers.service';

@UseGuards(AppAuthGuard)
@Controller('app/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  list(@Req() req: any) {
    return this.customersService.list(req.companyId);
  }

  @Post()
  create(@Req() req: any, @Body() body: { name: string; phone?: string }) {
    return this.customersService.create(req.companyId, body);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.customersService.remove(req.companyId, id);
  }
}
