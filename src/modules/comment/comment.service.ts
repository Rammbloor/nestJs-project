import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Comment} from './entities/comment.entity';
import {TaskService} from '../task/task.service';

@Injectable()
export class CommentService {

    constructor(private readonly taskService: TaskService,
                @InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }

    public async create(createCommentDto: CreateCommentDto, userId: string) {
        const {taskId, parentCommentId} = createCommentDto;
        const task = await this.taskService.findById(taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        let parentComment: Comment | null = null;
        if (parentCommentId) {
            parentComment = await this.commentRepository.findOne({where: {id: parentCommentId}});
            if (!parentComment) {
                throw new NotFoundException('Parent comment not found');
            }
        }
        const comment = this.commentRepository.create({...createCommentDto, ownerId: userId});
        return this.commentRepository.save(comment);
    }

    public async findAll() {
        return this.commentRepository.find();
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
