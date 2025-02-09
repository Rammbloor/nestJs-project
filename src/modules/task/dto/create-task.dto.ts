import {ApiProperty} from '@nestjs/swagger';



export class CreateTaskDto {


    @ApiProperty({example: 'Моя задача', description: 'Название задачи'})
    title: string;

    @ApiProperty({example: 'Нужно выполнить это', description: 'Описание задачи'})
    description?: string;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL фотографии'})
    urlFile: string;

    @ApiProperty({example: '6e8f4e02-c91c-465f-b22d-7f102fca381b', description: 'id проекта'})
    projectId?: string

    @ApiProperty({example: 'false', description: 'Задача не выполнена'})
    isCompleted?: boolean;
}