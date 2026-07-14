import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppAuthService } from './app-auth.service';
import { AppAuthController } from './app-auth.controller';

// Este módulo cuida SOMENTE do login de users (empresas clientes).
// Usa um secret diferente do admin, de propósito: um token de um
// domínio nunca é válido no outro.
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.APP_JWT_SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AppAuthController],
  providers: [AppAuthService],
  exports: [AppAuthService],
})
export class AppAuthModule {}
