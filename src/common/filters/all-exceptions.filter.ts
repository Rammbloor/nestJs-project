import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {LoggerService} from '../logger/winston-logger.service';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof Error ? 500 : 400;

        this.logger.error(
            `Exception occurred: ${exception instanceof Error ? exception.message : ` Unknown Error ${exception}`}`,
            exception instanceof Error ? exception.stack : 'No stack trace'
        )

        response.status(status).json({
            statusCode: status,
            message: exception instanceof Error ? exception.message : `Unknown Error ${exception}`,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}