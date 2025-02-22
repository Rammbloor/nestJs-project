
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as express from 'express';
import {RateLimitGuard} from './modules/auth/guards/rate-limit.guard';
import {LoggerService} from './common/logger/winston-logger.service';
import {AllExceptionsFilter} from './common/filters/all-exceptions.filter';
import {ConfigService} from '@nestjs/config';

async function start() {
    const app = await NestFactory.create(AppModule)

    const configService = app.get(ConfigService);
    const Port = configService.get<number>('PORT') || 3000;

    app.useGlobalGuards(new RateLimitGuard())

    const logger = app.get(LoggerService);
    app.useGlobalFilters(new AllExceptionsFilter(logger))

    const config = new DocumentBuilder().setTitle('Тренируюсь делать CRUD приложения')
        .setDescription('Базовые Crud действия')
        .setVersion('1.0.0')
        .addTag('Rammbloor')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.use(express.json({limit: '10mb'}));
    app.use(express.urlencoded({limit: '10mb', extended: true}));
    await app.listen(Port, () => console.log(`Server is running on port ${Port}!`))

}

start()