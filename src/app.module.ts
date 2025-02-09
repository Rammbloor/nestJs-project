import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './modules/user/entity/user.entity';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './modules/auth/auth.module';
import * as process from 'node:process';
import {UserModule} from './modules/user/user.module';
import {TaskModule} from './modules/task/task.module';
import {Task} from './modules/task/entity/task.entity';
import { FileModule } from './modules/file/file.module';



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
            synchronize: false,
            migrations: ['dist/migrations/*.js'],
            autoLoadEntities: true,
            migrationsRun: true,

        }),
        UserModule,
        AuthModule,
        TaskModule,
        FileModule,


    ]
})
export class AppModule {
}