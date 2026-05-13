import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  getDbOptions(): Record<string, string> {
    return {
      connectionString: `${this.get<string>('DATABASE_URL')}`,
    };
  }
}
