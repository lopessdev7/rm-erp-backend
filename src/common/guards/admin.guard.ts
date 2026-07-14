import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Só aceita tokens assinados com ADMIN_JWT_SECRET e scope 'admin'.
// Um token de empresa cliente (scope 'app') é sempre rejeitado aqui,
// mesmo que por engano alguém tente usá-lo nesta rota.
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = this.jwt.verify(token, { secret: process.env.ADMIN_JWT_SECRET });
      if (payload.scope !== 'admin') throw new UnauthorizedException();
      request.admin = payload;
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
