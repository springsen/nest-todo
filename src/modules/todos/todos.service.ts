import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Todo } from '../users/interfaces/user.interface';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Todo') private readonly todoModel: Model<Todo>,
  ) {}
  // 创建 todo
  async createTodo(username: string, todo: string) {
    const user = await this.userModel.findOne({ username });

    const createTode = new this.todoModel({
      complete: false,
      todo,
    });

    await user.todos.push(createTode);

    return user.save();
  }
  // 删除 todo
  async removeTodo(username: string, _id: string) {
    return this.userModel.updateOne(
      { username },
      {
        $pull: {
          todos: {
            _id,
          },
        },
      },
    );
  }
  // 更新 todo
  async updateTodo(
    username: string,
    _id: string,
    complete?: boolean,
    todo?: string,
  ) {
    // just complete
    if ('boolean' === typeof complete && 'string' !== typeof todo) {
      return this.userModel.updateOne(
        { username },
        {
          $set: {
            'todos.$[elem].complete': complete,
          },
        },
        { arrayFilters: [{ 'elem._id': _id }] },
      );
    }
    // just todo
    if ('string' === typeof todo && 'boolean' !== typeof complete) {
      return this.userModel.updateOne(
        { username },
        {
          $set: {
            'todos.$[elem].todo': todo,
          },
        },
        { arrayFilters: [{ 'elem._id': _id }] },
      );
    }
    // complete && todo
    if ('boolean' === typeof complete && 'string' === typeof todo) {
      return this.userModel.updateOne(
        { username },
        {
          $set: {
            'todos.$[elem].complete': complete,
            'todos.$[elem].todo': todo,
          },
        },
        { arrayFilters: [{ 'elem._id': _id }] },
      );
    }
    // exception
    throw {
      error: `参数不正确，complete: ${complete}, todo: ${todo}`,
      message: '请传递正确类型的参数',
    };
  }
  // 查询 todos
  async findAll(username: string) {
    const ret = await this.userModel.findOne({ username }, '-_id todos');
    return ret.todos;
  }
}
