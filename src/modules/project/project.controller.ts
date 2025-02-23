import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { ROLE } from '../../common/enums/role.enum';
import { Project } from './entities/project.entity';
import { GetJWTPayload } from '../../common/decorators/get-user-payload.decorator';
import { IJWTAuthPayload } from '../auth/interfaces/jwt-auth-payload.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Проекты')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 200, description: 'Проект создан', type: Project })
  @Roles(ROLE.USER)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async create(
    @GetJWTPayload() jwtPayload: IJWTAuthPayload,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(createProjectDto, jwtPayload.id);
  }

  @ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, description: 'Проекты получены', type: Project })
  @Roles(ROLE.ADMIN)
  @Get()
  public async findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Получить проект по id' })
  @ApiResponse({ status: 200, description: 'Проект получен', type: Project })
  @Roles(ROLE.USER)
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @ApiOperation({ summary: 'Получить задачи по id проекта' })
  @ApiResponse({ status: 200, description: 'Задачи получены', type: Project })
  @Roles(ROLE.USER)
  @Get(':id/tasks')
  public async findTasks(@Param('id') id: string) {
    const { tasks } = await this.projectService.findById(id);
    return tasks;
  }

  @ApiResponse({ status: 200, description: 'Проект обновлен', type: Project })
  @ApiOperation({ summary: 'Обновить проект по id' })
  @Roles(ROLE.USER)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Удалить проект по id' })
  @ApiResponse({ status: 200, description: 'Проект удален', type: Project })
  @Roles(ROLE.USER)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
