import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entity/task.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {v4 as uuidv4} from 'uuid';
import {S3} from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TaskService {
    private s3: S3;

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {
        this.s3 = new S3({
            accessKeyId: process.env.B2_ACCESS_KEY_ID,
            secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
            endpoint: process.env.B2_S3_ENDPOINT,
            region: process.env.B2_REGION,
            s3ForcePathStyle: true
        })
    }


    async create(createTaskDto: CreateTaskDto, id: number): Promise<Task> {
        const task = this.taskRepository.create({...createTaskDto, userId: id});
        return this.taskRepository.save(task);
    }


    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }


    async uploadPhotoToB2(file: Express.Multer.File): Promise<string> {
        const bucketName = process.env.B2_BUCKET_NAME;
        if (!bucketName) {
            throw new BadRequestException('Bucket name is not provided');
        }
        const fileExtension = file.originalname.split('.').pop();
        const key = `tasks/${uuidv4()}.${fileExtension}`;
        const uploadResult = await this.s3.upload({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'private',
        }).promise()

        return uploadResult.Location;
    }

    async uploadPhoto(id: number, file: Express.Multer.File): Promise<Task> {
        let task = await this.findById(id)
        task.urlPhoto = await this.uploadPhotoToB2(file)
        return this.taskRepository.save(task);
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