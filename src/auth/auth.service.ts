import { Injectable } from '@nestjs/common';
import { UserService, UserInRequest } from 'src/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from 'src/config';

export type AuthResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserInRequest | null> {
    const user = await this.userService.user({ email });
    if (
      user &&
      user.passwordHash &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      const { passwordHash, usedSpace, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: UserInRequest): Promise<AuthResponse> {
    const payload = {
      sub: user.id,
      email: user.email,
      iss: this.configService.getJwtIssuer(),
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
