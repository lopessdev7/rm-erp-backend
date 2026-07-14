import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AppAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) throw new UnauthorizedException('Credenciais inválidas');

    // Bloqueia login se a empresa estiver bloqueada — é aqui que o
    // status definido no painel admin passa a valer para o cliente.
    const company = await this.prisma.company.findUnique({ where: { id: user.companyId } });
    if (company?.status === 'BLOCKED') {
      throw new UnauthorizedException('Empresa bloqueada. Contate o suporte.');
    }

    const token = this.jwt.sign({
      sub: user.id,
      companyId: user.companyId,
      scope: 'app',
    });

    return { accessToken: token };
  }
}
