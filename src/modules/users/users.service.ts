import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private UserModel: Model<User>,
  ) {}

  /**
   * 创建用户
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.UserModel({
      username: createUserDto.username,
      password: '111',
    });

    return await createUser.save();
  }

  /**
   * 根据用户名,密码查找
   * @param username
   * @param password
   */
  async findOneByUsername(
    username: string,
    password: string,
  ): Promise<boolean> {
    return (await this.UserModel.findOne({ username, password })) !== null;
  }

  /**
   * 根据用户名查找
   * @param username
   */
  async hasUser(username: string): Promise<boolean> {
    return (await this.UserModel.findOne({ username })) !== null;
  }
}
