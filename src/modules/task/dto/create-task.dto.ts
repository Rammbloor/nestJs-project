import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';


export class CreateTaskDto {


    @ApiProperty({example: 'Моя задача', description: 'Название задачи'})
    title: string;

    @ApiProperty({example: 'Нужно выполнить это', description: 'Описание задачи'})
    description?: string;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL фотографии'})
    urlPhoto: string;

    @ApiProperty({example: 'false', description: 'Задача не выполнена'})
    isCompleted?: boolean;
}