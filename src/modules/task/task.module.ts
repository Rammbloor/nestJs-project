import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entity/task.entity';
import {ProjectModule} from '../project/project.module';


@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
      ProjectModule,
    TypeOrmModule.forFeature([Task]),
  ],
  exports: [TaskService,
  ]
})
export class TaskModule {}
