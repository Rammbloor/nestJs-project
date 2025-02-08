import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';;
import {Task} from './entity/task.entity';
import {RolesGuard} from '../auth/guards/role.guard';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {GetJWTPayload} from '../../common/decorators/get-user-payload.decorator';
import {IJWTAuthPayload} from '../auth/interfaces/jwt-auth-payload.interface';
import {ROLE} from '../../common/enums/role.enum';
import {Roles} from '../../common/decorators/role.decorator';

@ApiTags('Задачи')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }


    @ApiOperation({summary: 'Создание задачи'})
    @ApiResponse({status: 200, description: 'Задача создана', type: Task})
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(ROLE.USER)
    @Post()
    create(@GetJWTPayload() jwtPayload: IJWTAuthPayload,@Body() createTaskDto: CreateTaskDto) {

        return this.taskService.create(createTaskDto,jwtPayload.id);
    }

    @ApiOperation({summary: 'Получить все задачи'})
    @ApiResponse({status: 200, description: 'Пользователи получены', type: Task})
    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @ApiOperation({summary: 'Получить задачу по id'})
    @ApiResponse({status: 200, description: 'Задача получена', type: Task})
    @Get(':id')
    findById(@Param('id') id: string,) {
        return this.taskService.findById(+id)
    }

    @ApiOperation({summary: 'Обновить задачу'})
    @ApiResponse({status: 200, description: 'Задача обновлена', type: Task})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(+id, updateTaskDto);
    }

    @ApiOperation({summary: 'Удаление задачи'})
    @ApiResponse({status: 200, description: 'Задача удалена', type: Task})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.delete(+id);
    }
}
