import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import type { UserInRequest } from 'src/user';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(ThrottlerGuard, LocalAuthGuard)
  async login(@Req() req: { user: UserInRequest }) {
    return this.authService.login(req.user);
  }
}
