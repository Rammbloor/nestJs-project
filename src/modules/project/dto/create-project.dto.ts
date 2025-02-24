import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Мой проект', description: 'Название проекта' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Это проект', description: 'Описание проекта' })
  description: string;

  @IsNumber()
  @ApiProperty({ example: '1000', description: 'Стоимость проекта' })
  price: number;

  @IsBoolean()
  @ApiProperty({ example: 'false', description: 'Проект не выполнен' })
  isCompleted: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://images.app.goo.gl/', description: 'URL Файла' })
  urlFile?: string;
}
