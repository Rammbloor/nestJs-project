import { Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entity/task.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';


@Injectable()
export class TaskService {


    constructor(@InjectRepository(Task) private taskRepository: Repository<Task> ) {}

    async create(createTaskDto: CreateTaskDto, id: number): Promise<Task> {
        const task = this.taskRepository.create({...createTaskDto, userId: id});
        return this.taskRepository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async findById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({where: {id}});
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        let task = await this.findById(id)
        task = this.taskRepository.merge(task, updateTaskDto);
        return this.taskRepository.save(task);
    }

    async delete(id: number) {
        let task = await this.findById(id)
        await this.taskRepository.remove(task);
        return true
    }
}