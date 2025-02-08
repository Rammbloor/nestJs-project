import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {getJWTConfig} from '../../common/config/jwt.config';
import {UserModule} from '../user/user.module';
import {JwtStrategy} from './strategies/jwt-strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy ],
    imports: [
        UserModule,
        JwtModule.registerAsync(getJWTConfig())
    ],
    exports: [
        AuthService,
        JwtModule,
    ]
})
export class AuthModule {
}