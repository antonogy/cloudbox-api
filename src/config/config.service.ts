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
    return {
      secret: this.get<string>('AUTH_JWT_SECRET'),
      signOptions: {
        expiresIn: this.get<ms.StringValue>('AUTH_JWT_EXPIRES_IN'),
      },
    };
  }
}
