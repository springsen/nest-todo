import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Req() req) {
    const username = req.user.username;
    return await this.todosService.findAll(username);
  }

  @Post()
  async create(@Req() req, @Body() createTodoDto: CreateTodoDto) {
    const username = req.user.username;
    const user = await this.todosService.createTodo(
      username,
      createTodoDto.todo,
    );
    const _id = user.todos[user.todos.length - 1]._id;
    return _id;
  }

  @Put(':_id')
  async update(
    @Req() req,
    @Param('_id') _id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const username = req.user.username;
    const { complete, todo } = updateTodoDto;
    await this.todosService.updateTodo(username, _id, complete, todo);
    return 'update success';
  }

  @Delete(':_id')
  async deleteTodo(@Req() req, @Param('_id') _id: string) {
    const username = req.user.username;
    return await this.todosService.removeTodo(username, _id);
  }
}
