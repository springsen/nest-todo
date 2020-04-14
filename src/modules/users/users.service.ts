import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private UserModel: Model<User>,
  ) {}

  async create(): Promise<User> {
    const createUser = new this.UserModel({
      username: '111',
      password: '111',
    });

    return await createUser.save();
  }
}
