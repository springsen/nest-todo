import {
  Controller,
  Post,
  HttpCode,
  Body,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create.dto';
import { MongoError } from 'mongodb';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService
      .create(createUserDto)
      .catch((reason: MongoError) => {
        if (reason.code === 11000) {
          throw new ConflictException('user is existed');
        }
      });
    const token = await this.authService.signIn(createUserDto.username);
    return { token };
  }
}
