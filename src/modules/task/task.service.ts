import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entity/task.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Project} from '../project/entities/project.entity';
import {ProjectService} from '../project/project.service';


@Injectable()
export class TaskService {


    constructor(private readonly projectService: ProjectService,
                @InjectRepository(Task) private taskRepository: Repository<Task>,
    ) {
    }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const {projectId} = createTaskDto
        let project: Project | null = null
        if (projectId) {
            project = await this.projectService.findById(projectId);
            if (!project) {
                throw new NotFoundException(`Project with ID ${projectId} not found`);
            }
        }
        const task = this.taskRepository.create({...createTaskDto, userId: userId, projectId: projectId});
        return this.taskRepository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async findById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({where: {id}});
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        let task = await this.findById(id)
        task = this.taskRepository.merge(task, updateTaskDto);
        return this.taskRepository.save(task);
    }

    async delete(id: string) {
        let task = await this.findById(id)
        await this.taskRepository.remove(task);
        return true
    }
}