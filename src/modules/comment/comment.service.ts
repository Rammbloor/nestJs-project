import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import {Comment} from './entities/comment.entity';
import {TaskService} from '../task/task.service';

@Injectable()
export class CommentService {

    constructor(private readonly taskService: TaskService,
                @InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }

    public async create(createCommentDto: CreateCommentDto, taskId: string, userId: string) {
        const {parentId} = createCommentDto;
        const task = await this.taskService.findById(taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        let parent: Comment | null = null;
        if (parentId) {
            parent = await this.commentRepository.findOne({where: {id: parentId}});
            if (!parent) {
                throw new NotFoundException('Parent comment not found');
            }
        }
        const comment = this.commentRepository.create({...createCommentDto, ownerId: userId});
        return this.commentRepository.save(comment);
    }

    public async findAll() {
        return this.commentRepository.find();
    }

    public async findAllByTaskId(taskId: string, parentId: string | null, offset = 0, limit = 10) {
        const [comments, total] = await this.commentRepository.findAndCount({
            where: {
                task: {id: taskId},
                parent: parentId ? {id: parentId} : IsNull()
            },
            order: {id: 'ASC'},
            skip: offset,
            take: limit,
        });

        return {comments, total, offset, limit,};
    }

    public async findById(id: string) {
        const comment = await this.commentRepository.findOne({where: {id}});
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }

    public async update(id: string, updateCommentDto: UpdateCommentDto) {
        let comment = await this.findById(id)
        comment = this.commentRepository.merge(comment, updateCommentDto);
        return this.commentRepository.save(comment);
    }

    public async delete(id: string) {
        let comment = await this.findById(id)
        await this.commentRepository.remove(comment)
        return true
    }
}
