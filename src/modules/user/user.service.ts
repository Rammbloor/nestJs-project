import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ROLE} from '../../common/enums/role.enum';



@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    public async create(userDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({...userDto, role: ROLE.USER});
        if (!user) {
            throw new BadRequestException('Не удалось создать пользователя')
        }
        return this.userRepository.save(user);
    }

    public async getByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({where: {email}})
    }

    public async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}})
        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }
        return user;
    }

    public async getAll(): Promise<User[]> {
        const users = await this.userRepository.find()
        if (!users || users.length === 0) {
            throw new NotFoundException('Пользователи не найдены');
        }
        return users
    }

    public async update(id: number, userDto: UpdateUserDto): Promise<User> {

        let user = await this.userRepository.findOne({where: {id}})
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        user = this.userRepository.merge(user, userDto);
        return this.userRepository.save(user);
    }


    public async delete(id: number): Promise<boolean> {
        const user = await this.userRepository.findOne({where: {id}})
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        await this.userRepository.remove(user);
        return true
    }

}
