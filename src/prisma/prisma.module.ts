import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  imports: [ConfigModule],
  exports: [PrismaService],
})
export class PrismaModule {}
