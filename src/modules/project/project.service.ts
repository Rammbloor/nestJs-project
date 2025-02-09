import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Project} from './entities/project.entity';
import {Repository} from 'typeorm';


@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {
    }

    async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {

        const project = this.projectRepository.create({...createProjectDto, ownerId: userId});
        return this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async findById(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({where: {id}, relations: ['tasks']});
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }


    async findTasks(id: string) {
        const project = await this.findById(id)
        return project.tasks
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        let project = await this.findById(id)
        project = this.projectRepository.merge(project, updateProjectDto);
        return this.projectRepository.save(project);
    }

    async delete(id: string) {
        let project = await this.findById(id)
        await this.projectRepository.remove(project);
        return true
    }
}
