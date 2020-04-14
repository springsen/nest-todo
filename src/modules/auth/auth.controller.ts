import {
  Controller,
  Inject,
  forwardRef,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { resolve } from 'path';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  @Get('login')
  async login(@Req() request: Request) {
    const { username, password } = request.headers;
    if (!(username && password)) {
      throw new BadRequestException('认证参数未填写');
    }

    const hasUser = await this.usersService.findOneByUsername(
      String(username),
      String(password),
    );
    if (!hasUser) {
      throw new BadRequestException('账号或密码错');
    }

    const token = await this.authService.signIn(String(username));
    return { token };
  }
}
