import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly projectService: ProjectService,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  public async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    if (createTaskDto.projectId) {
      const project = await this.projectService.findById(createTaskDto.projectId);
      if (!project) {
        throw new NotFoundException(`Project with ID ${createTaskDto.projectId} not found`);
      }
    }
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId: userId,
    });

    return this.taskRepository.save(task);
  }

  public async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  public async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  public async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    let task = await this.findById(id);
    task = this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  public async delete(id: string) {
    const task = await this.findById(id);
    await this.taskRepository.remove(task);
    return true;
  }
}
