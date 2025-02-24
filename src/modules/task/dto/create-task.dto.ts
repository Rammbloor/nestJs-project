import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';
import { StatusTask } from '../../../common/enums/task-status.enum';
import { TaskSize } from '../../../common/enums/task-size.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Моя задача', description: 'Название задачи' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Нужно выполнить это', description: 'Описание задачи' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'S', description: 'Размер задачи' })
  @IsOptional()
  size?: TaskSize;

  @IsOptional()
  @IsDateString({}, { message: 'Неверный формат даты' })
  @MinDate(new Date(), { message: 'Дедлайн должен быть в будущем' })
  @ApiProperty({ example: '2023-01-01', description: 'Дедлайн задачи' })
  deadline?: string;

  @ApiProperty({ example: 'OPEN', description: 'Задача открыта' })
  @IsOptional()
  status?: StatusTask;

  @ApiProperty({ example: 'https://images.app.goo.gl/', description: 'URL файла' })
  @IsString()
  @IsOptional()
  urlFile?: string;

  @ApiProperty({ example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id проекта' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiProperty({ example: '4e02-c91c-465f-b22d-7f102fc=', description: 'id исполнителя задачи' })
  @IsString()
  @IsOptional()
  assigneeId?: string;
}
