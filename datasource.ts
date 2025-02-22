import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

const configService = new ConfigService(process.env);

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: Number(configService.get<number>('POSTGRES_PORT')),
    username: configService.get<string>('POSTGRES_USERNAME'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/**/*.ts'],
    synchronize: false,
    migrationsRun: true,
});

