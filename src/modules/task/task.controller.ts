import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entity/task.entity';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetJWTPayload } from '../../common/decorators/get-user-payload.decorator';
import { IJWTAuthPayload } from '../auth/interfaces/jwt-auth-payload.interface';
import { ROLE } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Задачи')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, description: 'Задача создана', type: Task })
  @Roles(ROLE.USER)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async create(
    @GetJWTPayload() jwtPayload: IJWTAuthPayload,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(createTaskDto, jwtPayload.id);
  }

  @ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({ status: 200, description: 'Пользователи получены', type: Task })
  @Roles(ROLE.ADMIN)
  @Get()
  public async findAll() {
    return this.taskService.findAll();
  }

  @ApiOperation({ summary: 'Получить задачу по id' })
  @ApiResponse({ status: 200, description: 'Задача получена', type: Task })
  @Roles(ROLE.USER)
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @ApiOperation({ summary: 'Обновить задачу' })
  @ApiResponse({ status: 200, description: 'Задача обновлена', type: Task })
  @Roles(ROLE.USER)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 200, description: 'Задача удалена' })
  @Roles(ROLE.USER)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
