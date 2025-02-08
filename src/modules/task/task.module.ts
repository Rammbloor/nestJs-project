import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entity/user.entity';
import {UserService} from '../user/user.service';
import {Task} from './entity/task.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
  exports: [TaskService,
  ]
})
export class TaskModule {}
