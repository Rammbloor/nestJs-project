import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../auth/guards/role.guard';
import {Roles} from '../../common/decorators/role.decorator';
import {ROLE} from '../../common/enums/role.enum';
import {GetJWTPayload} from '../../common/decorators/get-user-payload.decorator';
import {IJWTAuthPayload} from '../auth/interfaces/jwt-auth-payload.interface';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Comment} from './entities/comment.entity';


@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Комментарии')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @ApiOperation({summary: 'Создание комментария'})
    @ApiResponse({status: 200, description: 'Комментарий создан', type: Comment})
    @Roles(ROLE.USER)
    @Post()
    public async create(@GetJWTPayload() jwtPayload: IJWTAuthPayload, @Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto, jwtPayload.id);
    }

    @ApiOperation({summary: 'Получить все комментарии'})
    @ApiResponse({status: 200, description: 'Комментарии получены', type: Comment})
    @Roles(ROLE.ADMIN)
    @Get()
    public async findAll() {
        return this.commentService.findAll();
    }

    @ApiOperation({summary: 'Получить комментарий по id'})
    @ApiResponse({status: 200, description: 'Комментарий получен', type: Comment})
    @Roles(ROLE.USER)
    @Get(':id')
    public async findOne(@Param('id') id: string) {
        return this.commentService.findById(id);
    }

    @ApiOperation({summary: 'Обновить комментарий по id'})
    @ApiResponse({status: 200, description: 'Комментарий обновлен', type: Comment})
    @Roles(ROLE.USER)
    @Patch(':id')
    public async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(id, updateCommentDto);
    }

    @ApiOperation({summary: 'Удалить комментарий по id'})
    @ApiResponse({status: 200, description: 'Комментарий удален'})
    @Roles(ROLE.USER)
    @Delete(':id')
    public async delete(@Param('id') id: string) {
        return this.commentService.delete(id);
    }
}
