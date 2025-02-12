import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express'


@Injectable()
export class RateLimitGuard implements CanActivate {
    private readonly limiter = rateLimit({
        windowMs: 60 * 1000,
        limit: 10,
        message: 'Вы отправили слишком много запросов',
        legacyHeaders: false,
        standardHeaders: true
    })

    canActivate(context: ExecutionContext):Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        return new Promise((resolve)=>{
            this.limiter(request, response,()=>resolve(true))
        })
    }

}