import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './modules/user/entity/user.entity';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './modules/auth/auth.module';
import * as process from 'node:process';
import {UserModule} from './modules/user/user.module';
import {TaskModule} from './modules/task/task.module';
import {Task} from './modules/task/entities/task.entity';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Task],
            synchronize: true,
            autoLoadEntities: true,

        }),
        UserModule,
        AuthModule,
        TaskModule,


    ],
})
export class AppModule {
}