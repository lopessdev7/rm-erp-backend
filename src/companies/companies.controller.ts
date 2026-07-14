import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { CompaniesService } from './companies.service';

// Toda rota aqui exige token de admin_users — nenhuma empresa cliente
// enxerga ou acessa este controller.
@UseGuards(AdminGuard)
@Controller('admin/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  list() {
    return this.companiesService.list();
  }

  @Post()
  create(@Body() body: { name: string; document?: string }) {
    return this.companiesService.create(body);
  }
}
