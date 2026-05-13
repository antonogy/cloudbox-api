import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
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
    const expiresIn = this.get<ms.StringValue>('AUTH_JWT_EXPIRES_IN');

    if (!expiresIn) {
      throw new Error('AUTH_JWT_EXPIRES_IN is not defined');
    }

    return {
      secret: this.getJwtSecret(),
      signOptions: {
        expiresIn,
        issuer: this.get<string>('AUTH_JWT_ISSUER') || undefined,
      },
    };
  }

  getJwtSecret(): string {
    const secret = this.get<string>('AUTH_JWT_SECRET');

    if (!secret) {
      throw new Error('AUTH_JWT_SECRET is not defined');
    }

    return secret;
  }

  getThrottlerOptions(): ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          ttl: parseInt(this.get('THROTTLER_TTL') ?? '', 10) || 60000,
          limit: parseInt(this.get('THROTTLER_LIMIT') ?? '', 10) || 10,
        },
      ],
    };
  }
}
