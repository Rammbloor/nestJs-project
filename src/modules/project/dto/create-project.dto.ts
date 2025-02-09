import {ApiProperty} from '@nestjs/swagger';



export class CreateProjectDto {


    @ApiProperty({example: 'Мой проект', description: 'Название проекта'})
    title: string;

    @ApiProperty({example: 'Это проект', description: 'Описание проекта'})
    description: string;

    @ApiProperty({example: '1000', description: 'Стоимость проекта'})
    price: number;

    @ApiProperty({example: 'false', description: 'Проект не выполнен'})
    isCompleted: boolean;

    @ApiProperty({example: 'https://images.app.goo.gl/', description: 'URL Файла'})
    urlFile: string;
}
