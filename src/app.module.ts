import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './modules/user/entity/user.entity';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './modules/auth/auth.module';
import * as process from 'node:process';
import {UserModule} from './modules/user/user.module';
import {TaskModule} from './modules/task/task.module';
import {Task} from './modules/task/entity/task.entity';
import {FileModule} from './modules/file/file.module';
import {ProjectModule} from './modules/project/project.module';
import {Project} from './modules/project/entities/project.entity';
import {CommentModule} from './modules/comment/comment.module';
import {WinstonLoggerModule} from './common/logger/winston-logger.module';
import {Comment} from './modules/comment/entities/comment.entity';


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
            entities: [User, Task, Project,Comment],
            synchronize: false,
            migrations: ['dist/migrations/*.js'],
            autoLoadEntities: true,
            migrationsRun: true,

        }),
        UserModule,
        AuthModule,
        TaskModule,
        FileModule,
        ProjectModule,
        CommentModule,
        WinstonLoggerModule


    ]
})
export class AppModule {
}