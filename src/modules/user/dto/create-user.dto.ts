import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsInt, IsNotEmpty, IsString, Length, Max, Min, MinLength} from 'class-validator';


export class CreateUserDto {

    @ApiProperty({example: 'Вася', description: 'Имя пользователя'})
    @Length(3, 11)
    @IsString()
    name: string

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsEmail()
    email: string;

    @ApiProperty({example: '22', description: 'Возраст пользователя'})
    @IsInt()
    @Min(1)
    @Max(99)
    age: number

    @ApiProperty({example: '12345678', description: 'Пароль пользователя'})
    @MinLength(6)
    @IsString()
    password: string

}