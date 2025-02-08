import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../user/dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from '../user/entity/user.entity';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200, description: 'Токен пользователя'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 200, description: 'Пользователь зарегистрирован', type: User})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)

    }
}