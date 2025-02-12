import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';


export class CreateTaskDto {
    @ApiProperty({example: 'Моя задача', description: 'Название задачи'})
    @IsNotEmpty()
    @IsString()
    title: string;


    @ApiProperty({example: 'Нужно выполнить это', description: 'Описание задачи'})
    @IsString()
    description: string;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL фотографии'})
    @IsString()
    urlFile?: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id проекта'})
    @IsString()
    projectId?: string

    @ApiProperty({example: 'false', description: 'Задача не выполнена'})
    @IsBoolean()
    isCompleted?: boolean;
}