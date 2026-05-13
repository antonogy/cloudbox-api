import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config';
import { UserInRequest } from 'src/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  validate(payload: JwtPayload): UserInRequest {
    const id = Number(payload.sub);
    if (
      !payload.sub ||
      isNaN(id) ||
      !payload.email ||
      typeof payload.email !== 'string'
    ) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { id, email: payload.email };
  }
}
