import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Todo', schema: TodoSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
