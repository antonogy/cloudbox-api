import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import ms from 'ms';

@Injectable()
export class ConfigService
  extends NestConfigService
  implements JwtOptionsFactory
{
  getDbOptions(): Record<string, string> {
    return {
      connectionString: `${this.get<string>('DATABASE_URL')}`,
    };
  }

  createJwtOptions(): JwtModuleOptions {
    const secret = this.get<string>('AUTH_JWT_SECRET');
    const expiresIn = this.get<ms.StringValue>('AUTH_JWT_EXPIRES_IN');

    if (!secret) {
      throw new Error('AUTH_JWT_SECRET is not defined');
    }

    if (!expiresIn) {
      throw new Error('AUTH_JWT_EXPIRES_IN is not defined');
    }

    return {
      secret,
      signOptions: {
        expiresIn,
      },
    };
  }
}
