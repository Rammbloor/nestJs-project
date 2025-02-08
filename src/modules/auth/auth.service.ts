import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import {User} from '../user/entity/user.entity';
import {CreateUserDto} from '../user/dto/create-user.dto';
import {UserService} from '../user/user.service';
import {ROLE} from '../../common/enums/role.enum';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UserService,
                private jwtService: JwtService) {
    }


    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 7)
        return await this.usersService.create({...userDto, password: hashPassword})
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, role: user.role}
        return {
            token: this.jwtService.sign(payload)
        }

    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({message: 'Некорректный email'})
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный  пароль'})
    }
}