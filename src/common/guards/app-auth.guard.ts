import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Só aceita tokens assinados com APP_JWT_SECRET e scope 'app'.
// Sempre injeta companyId no request, para todo repositório/query
// filtrar automaticamente pela empresa do usuário logado.
@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = this.jwt.verify(token, { secret: process.env.APP_JWT_SECRET });
      if (payload.scope !== 'app') throw new UnauthorizedException();
      request.user = payload;
      request.companyId = payload.companyId;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractToken(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  }
}
