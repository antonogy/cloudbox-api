import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import type { UserInRequest } from 'src/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    return this.authService.login(req.user as UserInRequest);
  }

  @Post('logout')
  @UseGuards(LocalAuthGuard)
  logout(@Req() req: Request) {
    return req.logout(() => {});
  }
}
