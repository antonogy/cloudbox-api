import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: `${config.get<string>('DATABASE_URL')}`,
    });

    super({ adapter });
  }
}
