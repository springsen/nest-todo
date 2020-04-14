import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/nest-todo'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
