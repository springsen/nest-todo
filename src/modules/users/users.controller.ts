import {
  Controller,
  Post,
  HttpCode,
  Body,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create.dto';
import { MongoError } from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    const token = '';
    return { token };
  }
}
