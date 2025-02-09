import * as process from 'node:process';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as express from 'express';

async function start() {

    const Port = process.env.PORT || 3000

    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder().setTitle('Тренируюсь делать CRUD приложения')
        .setDescription('Базовые Crud действия')
        .setVersion('1.0.0')
        .addTag('Rammbloor')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    await app.listen(Port, () => console.log(`Server is running on port ${Port}!`))

}

start()