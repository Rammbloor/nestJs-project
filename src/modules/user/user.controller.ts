import {Body, Controller, Delete, Get, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entity/user.entity';
import {UserService} from './user.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../auth/guards/role.guard';
import {ROLE} from '../../common/enums/role.enum';
import {Roles} from '../../common/decorators/role.decorator';
import {GetJWTPayload} from '../../common/decorators/get-user-payload.decorator';
import {IJWTAuthPayload} from '../auth/interfaces/jwt-auth-payload.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Пользователь')
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    @ApiOperation({summary: 'Получить пользователя по ID'})
    @ApiResponse({status: 200, description: 'Пользователь найден', type: User})
    @Roles(ROLE.USER)
    @Get('/info')
    public async getById(@GetJWTPayload() jwtPayload: IJWTAuthPayload) {
        return this.usersService.getById(jwtPayload.id)
    }


    @ApiOperation({summary: 'Получить все пользователей '})
    @ApiResponse({status: 200, description: 'Пользователи получены', type: User})
    @Roles(ROLE.ADMIN)
    @Get()
    public async getAll() {
        return this.usersService.getAll();
    }


    @ApiOperation({summary: 'Обновить данные пользователя пользователя по ID'})
    @ApiResponse({status: 200, description: 'Пользователь обновлен', type: User})
    @Roles(ROLE.USER)
    @Put()
    public async update(@GetJWTPayload() jwtPayload: IJWTAuthPayload, @Body() userDto: UpdateUserDto) {
        return this.usersService.update(jwtPayload.id, userDto)
    }

    @ApiOperation({summary: 'Удалить пользователя по ID'})
    @ApiResponse({status: 200, description: 'Пользователь удален'})
    @Roles(ROLE.USER)
    @Delete()
    public async delete(@GetJWTPayload() jwtPayload: IJWTAuthPayload) {
        return this.usersService.delete(jwtPayload.id)
    }
}