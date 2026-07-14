import { Body, Controller, Post } from '@nestjs/common';
import { AppAuthService } from './app-auth.service';

@Controller('app/auth')
export class AppAuthController {
  constructor(private readonly appAuthService: AppAuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.appAuthService.login(body.email, body.password);
  }
}
