import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!admin) throw new UnauthorizedException('Credenciais inválidas');

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatches) throw new UnauthorizedException('Credenciais inválidas');

    // O payload nunca inclui companyId: admin não pertence a nenhuma empresa.
    const token = this.jwt.sign({
      sub: admin.id,
      email: admin.email,
      scope: 'admin',
    });

    return { accessToken: token };
  }
}
