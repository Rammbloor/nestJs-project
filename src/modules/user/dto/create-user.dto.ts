import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({example: 'Вася', description: 'Имя пользователя'})
    name: string
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    email: string
    @ApiProperty({example: '22', description: 'Возраст пользователя'})
    age: number
    @ApiProperty({example: '12345678', description: 'Пароль пользователя'})
    password: string

}