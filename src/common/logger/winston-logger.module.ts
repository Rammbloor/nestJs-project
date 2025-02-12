import { Module } from '@nestjs/common';
import {LoggerService} from './winston-logger.service';


@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class WinstonLoggerModule {}