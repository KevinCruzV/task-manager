import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/users.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) throw new Error('Missing env var: JWT_SECRET');

        const expiresIn = Number(
          config.get<string>('JWT_EXPIRES_IN_SECONDS') ?? 86400,
        );
        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
