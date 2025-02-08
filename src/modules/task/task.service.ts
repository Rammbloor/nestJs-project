import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entity/task.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {IJWTAuthPayload} from '../auth/interfaces/jwt-auth-payload.interface';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {
    }

    async create(createTaskDto: CreateTaskDto,id:number): Promise<Task> {
        const task = this.tasksRepository.create({...createTaskDto, userId: id});
        return this.tasksRepository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async findById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({where: {id}});
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        let task = await this.findById(id)
        task = this.tasksRepository.merge(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }

    async delete(id: number) {
        let task = await this.findById(id)
        await this.tasksRepository.remove(task);
        return true
    }
}