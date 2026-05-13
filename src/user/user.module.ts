import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
