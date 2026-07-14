import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  // Sprint 1: só o essencial para existir uma empresa de teste.
  // Ativar/bloquear, planos e estatísticas ficam para sprints futuras —
  // a estrutura (status, plan_id) já existe no schema para não exigir
  // migration depois.
  list() {
    return this.prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: { name: string; document?: string }) {
    return this.prisma.company.create({ data });
  }
}
