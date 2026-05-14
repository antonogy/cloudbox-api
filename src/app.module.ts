import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from './config';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getThrottlerOptions(),
    }),
  ],
  controllers: [],
})
export class AppModule {}
