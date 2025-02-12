import {Injectable} from '@nestjs/common';
import * as winston from 'winston';


@Injectable()
export class  LoggerService {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({level, message, timestamp}) => {
                    return `${timestamp} ${level.toUpperCase()}: ${message}`
                })
            ),
            transports: [
                new winston.transports.Console(),
            ]
        })
    }

    log(message: string) {
        this.logger.info(message)
    }

    error(message: string, trace?: string) {
        this.logger.error(`${message} ${trace || ''}`)
    }

    warn(message: string) {
        this.logger.warn(message)
    }

    debug(message: string) {
        this.logger.debug(message)
    }

    verbose(message: string) {
        this.logger.verbose(message)
    }

}