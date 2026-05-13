import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  ValidationError,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const errors = await this.validateCredentials(request.body);
    if (errors.length > 0) {
      throw new BadRequestException('Validation of login credentials failed');
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  async validateCredentials(body: {
    email: string;
    password: string;
  }): Promise<ValidationError[]> {
    const loginDto = new LoginDto();
    loginDto.email = body.email;
    loginDto.password = body.password;

    return validate(loginDto);
  }
}
